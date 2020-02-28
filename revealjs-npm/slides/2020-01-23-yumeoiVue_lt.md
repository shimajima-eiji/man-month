## Vue + GAS でサクサクAPIを使う（ついでにWebサイト作る）

---

## 環境構築のためにコマンド叩かせるシステムはオワ（らせたい）コン
今回使うVueもすべてCDNで構築されています。

---

## What are you?

```
{
  name: "@nomuraya",
  position: ["フルスタックDev-QA", "PM"],
  style: ["フリーランス", "契約社員", "講師バイト"],
  affiliation: ["アウトプット部", "関東GASの会"],
  swamp:"生活家電", "オーディオ", "自作PC"],
}
```

---

## 対象者
- コピペでエラーなくシステムを作りたい人
- 何でもいいから簡単にWebAPIを作りたい人
- 俺にとって訳わからん動きをするな！とPCに向かって怒る人

これら一つも該当しない人を便宜的に上級者と呼びます。

---

## デモ

---

## Agenda
- **なぜVueとGASなのか？**
- どうやって実装したのか
- ちょっとだけ技術的な話
- まとめ

---

## スライドは公開していますが、Markdownで書いてるのでRevealJSを入れてください。

---

### VueとGASを組み合わせると何が嬉しいか？
- **APIのモックを自分で作れる。**
- 環境構築のために時間を使う事がなくなる。
  - Vue用のhtmlやjsもGASに置ける。ローカル不要
  - ホスティングしてくれる
  - 環境変数の管理が楽
- GitHub連携でバージョン管理が楽
- これからエンジニアリングを始める人にウケが良い（主観）
- エディタ不要

---

## VueとGASを組み合わせる上で不満なこと
- **ES6が使えない**（致命的）
  - clasp入れればいいんですが、npmパッケージのアップデートが負債に
- **構造化できない**（致命的）
  - フロント・バックエンドの設計に弱いため大型化できない
  - ファイル管理で地獄を見ることに
- 慣れないうちは設計が器用貧乏になりがち
- エンジニアの仕事ではないような気持ちになってくる。特にRPAでGASを使う場合
- DBが使えないのでスプレッドシートをなんちゃってDBにしがち

---

## Agenda
- なぜVueとGASなのか？
- **どうやって実装したのか**
- ちょっとだけ技術的な話
- まとめ

---

## やること
1. アカウント作る
1. https://drive.google.com/drive/my-drive 開く
1. スプレッドシート作る
1. スクリプトエディタを開く

ブラウザ不問、OS不問で使える無料のステキ環境が一瞬で作れます。

---

## やること（任意）
1. [Google Apps Script GitHub アシスタント](https://chrome.google.com/webstore/detail/google-apps-script-github/lfjcgcmkmjjlieihflfhjopckgpelofo)（Chrome拡張機能）を入れる
1. [このリポジトリ](https://github.com/shimajima-eiji/GAS/tree/GASとVueでサイト作り) をcloneする
1. Webアプリケーションとして導入する

---

## Agenda
- なぜVueとGASなのか？
- どうやって実装したのか
- **ちょっとだけ技術的な話**
- まとめ

---

## コード(index.html)
```
<head>
  <?!= include('css'); ?>
  <script src="https://cdn.jsdelivr.net/npm/vue"></script>
</head>
<body>
  <div id="SS-table">
    <table>
      <tr><th v-for="item in header">{{ item }}</th></tr>
      <tr v-for="row in rows"><td v-for="item in row">{{ item }}</td></tr>
    </table>
  </div>
  <?!= include('js'); ?>
</body>
```

---

## コード(js.html)
```
<script>
  var vm = new Vue( {
    // ~~
    created: function ()
    {
      google.script.run
        .withSuccessHandler( this.initData )
        .withFailureHandler( function ( arg )
        {
          console.log( arg )
          alert( "データの取得に失敗しました。" );
        } ).getSheetData();
    }
  // ~~
</script>
```

---

## コード（server.gs）
```
function doGet(request) {
  return HtmlService.createTemplateFromFile('index').evaluate();
}
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function getSheetData(){
  var spreadSheetID = "(Your Sheet ID)";
  var sheetName = "シート1";
  var res = SpreadsheetApp.openById(spreadSheetID)
    .getSheetByName(sheetName).getDataRange().getDisplayValues();
  return res;
}
```

---

## Agenda
- なぜVueとGASなのか？
- どうやって実装したのか
- ちょっとだけ技術的な話
- **まとめ**

---

## まとめ
- APIのモックが手軽に欲しいならGAS
- 大規模な開発をするならなんちゃってマイクロサービス化も辞さない覚悟でやるか、ツールとして割り切る
- VueやGASの機能を活かすにはnpmは必須、CDNには限界がある
- セキュリティ面が不安。やるとしても社内システムじゃないと危ない（流出危機は回避できていない）

---

## 事例紹介（時間があったら）
（今回のLTで使用したソースはGithubに上げてます）

---

## Thank you for your attention
- 登壇依頼(フロント・IoT-AI:Python)
- リモートワーク(GAS/Vue)の案件
- 社会人講師(PHP, Java)

Wanted!!

このスライドはRevealJSを使ってるです
