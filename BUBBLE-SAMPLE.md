## API Connector

Cloud FunctionsのエンドポイントにPOSTリクエストを投げる。




## Workflow

### Step 1 Cloud Functionsを叩く

これ以降のStepでレスポンスを利用する。

<img width="804" alt="スクリーンショット 2020-07-30 13 43 16" src="https://user-images.githubusercontent.com/381483/88882106-2ce92800-d26c-11ea-83d6-cf67bf24181f.png">

## Step 2〜4 エラ〜メッセージを表示する

StripeのCreate External Account APIはエラー発生時にどのパラメーターに不備があったかを返してくれる。ただし、返ってくるのは一種類のみ。

そのため、 `param: hoge にエラーがあった時にエラ〜メッセージ piyo を表示する` というアクションを、パラメーターの数だけ用意する必要がある。

<img width="1024" alt="スクリーンショット 2020-07-30 13 43 36" src="https://user-images.githubusercontent.com/381483/88882107-2f4b8200-d26c-11ea-8cd9-f156c3db2a4a.png">

<img width="1155" alt="スクリーンショット 2020-07-30 13 43 57" src="https://user-images.githubusercontent.com/381483/88882114-31addc00-d26c-11ea-894d-a5c4190a5a05.png">

<img width="1300" alt="スクリーンショット 2020-07-30 13 44 05" src="https://user-images.githubusercontent.com/381483/88882119-34103600-d26c-11ea-889b-6cee6a5e10c9.png">

## Step 5 

今回のプロジェクトでは参照してないデータ。本番運用を想定したとき、外部APIを叩くよりBubbleの読み込む方がメリットがあると考え、保存する。

主なメリットは読み込み速度の向上とDesign,Workflowの書きやすさ・読みやすさ。

<img width="1098" alt="スクリーンショット 2020-07-30 13 44 22" src="https://user-images.githubusercontent.com/381483/88882120-35416300-d26c-11ea-8043-497f175ae3ee.png">

## Step 6,7 Finalize

エラーがなかったらポップアップを閉じてリロードする。

<img width="1351" alt="スクリーンショット 2020-07-30 13 44 35" src="https://user-images.githubusercontent.com/381483/88882126-396d8080-d26c-11ea-8a6d-7454da497cb6.png">
<img width="698" alt="スクリーンショット 2020-07-30 13 44 46" src="https://user-images.githubusercontent.com/381483/88882131-3bcfda80-d26c-11ea-81ec-43e6412e38c4.png">
