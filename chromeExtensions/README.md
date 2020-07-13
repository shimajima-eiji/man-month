# chrome拡張機能
とりあえず動かせるものがほしかったので必要最低限の機能に凝縮。
cloneすればプロトタイプとして使えるようにする。

## ページに適用したい場合
manifest.json
```
{
  "name": "マイクロな拡張機能",
  "version": "1.0",
  "description": "拡張機能として入れるためだけの超マイクロなマニフェスト",
  "manifest_version": 2,
  "content_scripts": [
    {
      "matches": [
        "http://*/*",
        "https://*/*"
      ],
      "js": [
        "content.js"
      ]
    }
  ]
}
```
マッチした場所でjsが実行する。

### 補足
気になったのが、matchesのパターンで`http://*`ではダメなの？というもの。
やってみると、
```
拡張機能を読み込めませんでした
ファイル
I:\OneDrive\開発\extensions
エラー
Invalid value for 'content_scripts[0].matches[0]': Empty path.
マニフェストを読み込めませんでした。
```
と怒られた。
`http://*/*`とする必要があるようだ。

```
// content.js
console.log("拡張機能だよ");
```

とりあえず動いているのが見たいので、どこでも拡張機能がコンニチワする煩いコードを用意した。
これで
```
$ tree
.
├── README.md
├── content.js
└── manifest.json

0 directories, 3 files
```
となったので、これをブラウザに読み込ませる。
