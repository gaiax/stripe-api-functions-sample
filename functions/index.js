const functions = require('firebase-functions');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// TODO: 関数の再試行を考慮する
// https://firebase.google.com/docs/functions/retries?hl=ja

exports.createExternalAccount = functions
  .region('asia-northeast1')
  .https.onRequest(async (request, response) => {
    if (request.method !== 'POST') {
      return Promise.reject(Error())
    }

    // TODO: バリデーション

    let account = await stripe.accounts.create(
      {
        type: 'custom',
        country: 'JP',
        requested_capabilities: [
          'card_payments',
          'transfers',
        ],
      }
    );

    // TODO: リクエストボディのアカウントIDを使う
    // let body = await stripe.accounts.createExternalAccount(request.body.account.id, {

    // TODO: BubbleのAPI Connector向けに、成功時と失敗時のbodyの構造を合わせる（`Initialize call`対応）
    let body = await stripe.accounts.createExternalAccount(account.id, {
      external_account: {
        object: 'bank_account',
        country: 'JP',
        currency: 'jpy',
        default_for_currency: true,
        account_number: request.body.account_number,
        routing_number: request.body.bank_number + request.body.branch_number,
        account_holder_name: request.body.account_holder_name
      }
    }).then(account => {
      return account
    }).catch(error => {
      console.log(error)
      return error
    })
    response.send(body);
  })
