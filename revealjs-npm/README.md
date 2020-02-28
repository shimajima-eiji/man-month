# 導入
```
git clone https://github.com/hakimel/reveal.js.git
cd reveal.js
npm install
npm start
```

最新版は上記にて。

## npmのバージョン
WSLで`apt install npm`とすると古いバージョンが入るので、

1. nodejsとnpmを入れてnをインストールする
1. nを使って安定版を入れる
1. npmが競合するのでpurgeする
1. shellを再起動する

```
apt install -y nodejs npm
npm install n -g
n stable
apt purge -y nodejs npm
exec $SHELL -
```

# 使い方
1. Markdownコンテンツをslides以下に配置
1. index.html:L33のdata-markdownを書き換える
  - `<section data-markdown="./slides/2020-01-23-yumeoiVue_lt.md" data-separator="^\n---\n"`
