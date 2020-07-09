# Stripe Connect API

## セットアップ

### プロジェクトのセットアップ

```sh
$ npm install
$ npx firebase login
## 予めFirebaseコンソールでCloud Functionsを有効化する
$ npx firebase use
## Stripeアカウントを作成しておく
## - [シークレットキーを確認する](https://dashboard.stripe.com/test/apikey)
## - [Stripe Connectを有効化する](https://dashboard.stripe.com/connect/overview)
## - [ブランディングを設定する](https://dashboard.stripe.com/test/settings/applications)
$ npx firebase functions:config:set stripe.secret_key=YOUR_SECRET_KEY
## Cloud Functionsの環境構成をローカルで使うためのファイル
## 予め `firebase functions:config:set` で環境構成をセットしておく
$ npx firebase functions:config:get > .runtimeconfig.json
```

### Cloud Functionsのセットアップ

```sh
$ cd functions
$ npm install
```

## デプロイ

```sh
$ cd functions
$ npm run deploy
```

## ローカルでサーバーを起動する

```sh
$ cd functions
$ npm start

## ホットリロードで開発する。
## 予期せぬエラーが発生するとサーバーが止まる。その場合、index.jsのタイムスタンプを更新する（テキトーにファイル保存したり `touch index.js` する）と再起動できる。
$ npm run watch

## 銀行口座を登録する。account_idをStripe ConnectのアカウントIDに置き換えること。
$ curl -X POST http://localhost:8080 -F "account_number=0001234" -F "branch_number=000" -F "bank_number=1100" -F "account_holder_name=カ）ヤマダ" -F "account_id=acct_xxxxxxxxxxxxx" -F "app_user_id=1"

```

## リソース

- [ダッシュボード – Stripe](https://dashboard.stripe.com/dashboard)
- [Firebase コンソール](https://console.firebase.google.com/)
- [GoogleCloudPlatform/functions-framework-nodejs: FaaS (Function as a service) framework for writing portable Node.js functions](https://github.com/GoogleCloudPlatform/functions-framework-nodejs)

