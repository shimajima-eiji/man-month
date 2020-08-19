# microCMS-tutorial
予め[microCMS](https://microcms.io)などAPIを設定しておく。
<br>作成時は[APIスキーマ](https://github.com/shimajima-eiji/Hosting/blob/APIスキーマ.json)の通り作成する。

## ローカル・開発環境設定
- ダウンロード
  - `git clone https://github.com/shimajima-eiji/Hosting.git -b microCMS-tutorial`
- [.env](https://github.com/shimajima-eiji/Hosting/blob/microCMS-tutorial/.env)にmicroCMSで作った変数を入れる
  - URL=(ENDPOINT)  サンプル時: https://nomuraya-tutorial.microcms.io/api/v1/test
  - API_KEY=(X-API-KEY)  サンプル時: 6615a5a4-b894-445e-b979-24612d1a018c
- node_modulesを作成
  - `npm install`
- ローカル環境でサクッと見れるようにする
  - `npm run dev`
- distを作ってnetlifyに上げる
  - `npm run generate`

## 画面プレビュー
1. [ターミナル] `npm run dev`を実行する
1. [ブラウザ] API設定->画面プレビューで `http://localhost:3000/{CONTENT_ID}?draftKey={DRAFT_KEY}` を設定する
  - portを変更している場合は適宜変更する。デフォルトでは3000番を採用
1. [ブラウザ] コンテンツ管理の各記事にある「画面プレビュー」で開く
  - APIプレビューではない

下書き状態でも作成したページが表示される。
公開済みのページやdraftKeyをパラメーターに設定していない下書きは表示されない。

## 使用例
- 一覧ページ取得で`id: draft`が取得されていない（下書き中のもの）
  - コマンド: : `curl "https://nomuraya-tutorial.microcms.io/api/v1/test" -H "X-API-KEY: 6615a5a4-b894-445e-b979-24612d1a018c"`
- 下書きページ: http://localhost:3000/draft
- 下書きページを見る: http://localhost:3000/draft?draftKey=ukzdca1sE5

# Netlifyに於けるnodejsのバージョン指定
[.nvmrc](https://github.com/shimajima-eiji/Hosting/blob/microCMS-tutorial/.nvmrc)で指定できる。
開発環境に合わせるなら`node -v >.nvmrc`とする。

## nodeのバージョンを最新にする場合（安定版）
最新版にすると動かなくなるパッケージがあるので、必要でなければ安定版を推奨。

```
sudo npm install -g n
sudo n install stable
sudo n
# インストールされたバージョンを選択する
node -v
```

# Netlify設定
- [公開ページ](https://nomuraya-microcms-tutorial.netlify.app/)
## デプロイ時のログで`nuxt generate`から進まない
開発（ローカル）環境でdistが作れるなら、distだけをNetlifyに渡してホスティングさせる手がある。

- Build & deploy
  - Continuous Deployment
    - Build settings
      - Build command: (none)
      - Publish directory: dist

と設定すると静的ファイルだけホスティングさせる事ができる。
