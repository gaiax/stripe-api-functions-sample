# Stripe Connect API

## セットアップ

### プロジェクトのセットアップ

```sh
$ npm install
$ npx firebase login
### 予めFirebaseコンソールでCloud Functionsを有効化する
$ npx firebase use
```

### Cloud Functionsのセットアップ

```sh
$ cd functions
$ npm install
$ cp .env.example .env
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

