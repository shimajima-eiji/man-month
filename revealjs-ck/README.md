# revealjs-ck
- [解説ページ](https://qiita.com/vivid_muimui/items/bf29f4fd85207474a948)
- [サンプルページ](https://shimajima-eiji.github.io/revealjs-ck/sample/)

サンプルページをスマートデバイスで見た場合、スワイプするとスライドを移動できます。

# 使い方
1. 念のためにGemfileを用意していますが、Rubyを使います。
1. reveal-ckを入れたら、slides.mdをrootに作ります。
1. rootでreveal-ck generateとすると、このサンプルページのようにslidesディレクトリが作成され、以下にコンパイルされた色々が出力されます。
1. slides.mdをslidesディレクトリに移動します。
1. slidesディレクトリを任意にリネームします。

[スクリプト](https://github.com/shimajima-eiji/revealjs-ck/blob/master/easy_create.sh)にしました。
-hで使い方が表示されますが、
shで確認していますので、bashやzsh他での動作確認はしていません。
function辺りが怪しいのでそこだけ書き換えてください。

```
sh easy_create.sh (dirname)
```
