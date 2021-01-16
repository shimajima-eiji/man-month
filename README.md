# Gatsby+microCMS+NetlifyでJAMstackなブログ用サイトを作る
必要な機能は必要な時に限定して使っていくスタイルで対応。<br>
基本的にはmasterブランチで大枠となるフレームワークを形成して、Netlifyへのデプロイは「deploy-（名前）」のように管理していく。<BR>
また、デプロイ先（ここではNetlifyを想定している）の環境変数に.envに相当する値を設定する。<BR>
変数名は`GATSBY_`で始まる必要があるようだが、なぜかは忘れた。（ローカルでは動くけどNetlifyでは動かない、といったような問題だった気がする）

## 使い方
このリポジトリをforkしてNetlifyにdotenvの設定をmicroCMSで作成した内容を反映させる。<BR>
後述の理由でprivateにしたい場合は、最新のソースを手動でアップデートする必要はあるが、このリポジトリをcloneして任意のリポジトリをprivateで作成してpushすればできる。

#.env

```
GATSBY_API_KEY=(your API Key)
GATSBY_SERVICE_ID=(Service ID)
```

ソースコードが変更されるため、APIはここでは設定していない

## microCMSのAPI設定時の注意
ローカルで`gatsby develop`などからGraphQLの画面を見ると、allMicrocms（API名。先頭文字は大文字になる）という命名規則があるようだ。<BR>
そのため、API名を書き換えるとコードを変更する必要があるため、APIを変更したい場合はprivateリポジトリを作ると良い。

ここでは、ソースコードを変えたくないのでAPI名はMainで統一しているが、任意で設定したい場合は該当するJSファイル全ての`allMicrocmsMain`のMainを全部変更する。<BR>

```
find . -name "*.js" -o -type d -name node_modules -prune -o -type d -name public -prune -o -type d -name .cache -prune | xargs sed -i.bak -e '-s/Main/(変更)/g'
```

掛けて置き換えると楽。<BR>
念の為、

```
find . -name "*.js" -o -type d -name node_modules -prune -o -type d -name public -prune -o -type d -name .cache -prune | xargs grep -n allMicrocmsMain 2>/dev/null
```

などで確認しておくようにしよう。

よくわからない場合は、microCMSでAPI名を作る時は`main`のみ使おう。

# ヒント
## Gatsbyを使ってmicroCMSを運営する資料・情報がない
（ピンポイントでmicroCMSを使う理由がないのでそういう資料は）ないです。

要はGraphQLで取得できる「allMicrocmsMain」がそれぞれ活用しているAPIサーバーの設定に変更できれば良い。<BR>
なのでこのソースはmicroCMS以外で活用することは可能だし、microCMS以外のヘッドレスCMSの情報を参照すれば解決できる可能性は高い。

## 仕様・罠
GatsbyかGraphQLか分からないが、何かの原因でNullのデータを参照しようとするとCreatePageに失敗する。<BR>
開発環境で最新のデータが取れない（たぶん`gatsby build`なら大丈夫）のは困るので、microCMSに登録するデータにNullを認めないようにしよう。

たとえば、Nullに相当する項目には0や使わない任意の記号をいれたり、Nullだと分かる書き方をする方法が考えられる。
データ型の違いもあるので、判定時は厳密に行うこと。`===`や`!==`が望ましい。

## なぜ`gatsby-transform-remark`を採用しないのか
まずはじめに、Gatsbyを使ってJAMstackにしたいだけなら`gatsby-source-filesystem`を使うべきだ。<BR>
ローカルに.mdファイルを作成することで、Gatsbyの強力なプラグインの恩恵を受けやすくなる。

それでも採用しないのは訳がある。<BR>
これはGatsbyとかmicroCMSとかは関係なく、

- どこからでも
- PCでもスマホでも
- 記事を書いたら即反映

上記の、無料ブログでも出来る3つの基本的な要件を満たすために、ローカルで記事を書く方式を採用していない。<BR>
また、取得したjsonをどこかに置けば（それこそGithubとか）バージョン管理やバックアップも取れる。<BR>
この点はローカルでMarkdownを書く方式と同じであるため、全くデメリットにならない。

ただし、先述の通りGatsbyのプラグインの恩恵を受けにくくなる。

## 手っ取り早くビュー（画面プレビュー設定）がしたい。
1. `gatsby-config.js`でデータを受けて表示するためのビューを作る
1. `gatsby develop`で環境を作る
1. microCMSの画面プレビュー(https://（ここにサービスID）.microcms.io/apis/（ここにAPI）/settings/preview)で`http://localhost:8000/{CONTENT_ID}?draftKeys={DRAFT_KEY}`を入れる

これで見れるようになる。<BR>
環境を作るのが面倒なら、このリポジトリをクローンすれば最初の工程は飛ばして`gatsby-develop`をすれば良い。<BR>
その場合、APIは`main`で作成する必要がある。<BR>
それすら面倒な場合は、

```
https://nomuraya-diary.netlify.app/{CONTENT_ID}?draftKeys={DRAFT_KEY}
```

を使う事もできなくはない。（なるべく止めてね、とお願いはしておく）

## スキーマの設定が知りたい
schema.jsonを参照。<BR>
2021/01/12 時点の最新状態。ソースコードのアップデートが早いので、もしかしたら使えなくなっているかもしれないので、[issue](https://github.com/shimajima-eiji/microcms-gatsby/issues/new)辺りで声をかけてほしい。<br>
なるべく早く対応できるようにしたい。
