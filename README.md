# Stripe Connect API

## 概要

[Bubble](bubble.io)のAPI Connectorから外部APIを叩くには不便な仕様がある（2020年7月31日時点）。

このリポジトリはAPI ConnectorとStripe APIの仲介役になるCloud Functionsを扱うプロジェクトです。

イメージ図

```
[bubble.ioのAPI Connector Plugin] --- [Cloud Functions（このプロジェクト）] --- [Stripe API]
```

- [Bubbleの使用例](./BUBBLE-SAMPLE.md)

## :exclamation: :exclamation: このプロジェクトは実装サンプルです :exclamation: :exclamation:

プロダクションで利用する場合、Bubbleの仕様変更や現行仕様の把握、Functionsに認証処理の追加等の検討を推奨します。

### プロジェクトのセットアップ

```sh
$ npm install
$ npx firebase login
```

予めFirebaseコンソールでCloud Functionsを有効化する。

```sh
$ npx firebase use
```

Stripeアカウントを作成する。

- [シークレットキーを確認する](https://dashboard.stripe.com/test/apikey)
- [Stripe Connectを有効化する](https://dashboard.stripe.com/connect/overview)
- [ブランディングを設定する](https://dashboard.stripe.com/test/settings/applications)

```sh
$ npx firebase functions:config:set stripe.secret_key=YOUR_SECRET_KEY
```

Cloud Functionsの環境構成をローカルで使うためのファイルを準備する。
予め `firebase functions:config:set` で環境構成をセットする必要がある。

```sh
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

