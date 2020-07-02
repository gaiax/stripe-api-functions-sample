const functions = require('firebase-functions');
const stripe = require('stripe')(functions.config().stripe.secret_key);

function infof(accountId, appUserId, message) {
  console.log('account_id=' + accountId + ',app_user_id=' + appUserId + ': ' + message)
}

function errorf(accountId, appUserId, message) {
  console.log('account_id=' + accountId + ',app_user_id=' + appUserId + ': ' + message)
}

// TODO: 関数の再試行を考慮する
// https://firebase.google.com/docs/functions/retries?hl=ja

exports.createExternalAccount = functions
  .region('asia-northeast1')
  .https.onRequest(async (request, response) => {
    // TODO: リクエストボディのaccount_idを使う
    let accountId = request.body.account_id

    infof(accountId, request.body.app_user_id, 'Start')

    if (request.method !== 'POST') {
      infof(accountId, request.body.app_user_id, 'Finalize')
      return new Promise.reject(new Error('Invalid request'))
    }

    // API Connectorに対して、成功時とエラー時で共通のデータ構造を返す。
    // API Connectorは「`Initialize call` したときのレスポンス」のデータ構造しか扱えない。
    let body = {
      external_account: {
        id: undefined,
        object: 'bank_account',
        account: undefined,
        account_holder_name: undefined,
        account_holder_type: undefined,
        bank_name: undefined,
        country: 'JP',
        currency: 'jpy',
        default_for_currency: undefined,
        fingerprint: undefined,
        last4: undefined,
        // metadataのデータ構造を変更する度、BubbleのAPI Connectorで `Reinitialize` すること
        metadata: {
          user_id: undefined
        },
        routing_number: undefined,
        status: undefined
      },
      // Stripe APIエラーレスポンスの `raw.param`
      error_param: undefined
    }

    let account = await stripe.accounts.retrieve(accountId)
      .catch(error => {
        body.error_param = 'account_id'
        errorf(accountId, request.body.app_user_id, error)
        return error
      })
    let isRetrieved = typeof (account.id) === 'string'
    if (!isRetrieved) {
      response.send(body)
      errorf(accountId, request.body.app_user_id, 'Finalize')
      return Promise.reject(new Error('Stripe account not be found: ' + accountId))
    }

    await stripe.accounts.createExternalAccount(accountId, {
      external_account: {
        object: 'bank_account',
        country: 'JP',
        currency: 'jpy',
        default_for_currency: true,
        account_number: request.body.account_number,
        routing_number: request.body.bank_number + request.body.branch_number,
        account_holder_name: request.body.account_holder_name,
        metadata: {
          user_id: request.body.app_user_id
        }
      }
    }).then(externalAccount => {
      infof(accountId, request.body.app_user_id, 'Created external_account: ' + externalAccount.id)
      body.external_account = externalAccount
      return externalAccount
    }).catch(error => {
      errorf(accountId, request.body.app_user_id, error)
      if (error.raw.code === 'account_invalid') {
        body.error_param = 'account_id'
      }
      switch (error.raw.param) {
        case 'external_account[account_number]':
          body.error_param = 'external_account[account_number]'
          break;
        case 'external_account[routing_number]':
          body.error_param = 'external_account[routing_number]'
          break;
        case 'external_account[account_holder_name]':
          body.error_param = 'external_account[account_holder_name]'
          break;
      }
      return error
    })
    response.send(body)
    infof(accountId, request.body.app_user_id, 'End')
  })
