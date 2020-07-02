# Stripe Connect API

## セットアップ

### プロジェクトのセットアップ

```sh
$ npm install
$ npx firebase login
## 予めFirebaseコンソールでCloud Functionsを有効化する
## Stripeアカウントを作成後、シークレットキー を確認する
## https://dashboard.stripe.com/test/apikey
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
```

## リソース

- [Firebase コンソール](https://console.firebase.google.com/)
- [GoogleCloudPlatform/functions-framework-nodejs: FaaS (Function as a service) framework for writing portable Node.js functions](https://github.com/GoogleCloudPlatform/functions-framework-nodejs)

