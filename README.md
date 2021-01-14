# スピードテスト
- [いつもの](https://developers.google.com/speed/pagespeed/insights/?hl=ja)
- [検証サイト](https://5fffc1fdbfe34936016a210d--speedtest-netlify.netlify.app)

# 2021/01/14 02:48時点の検証結果
<img width="678" alt="スクリーンショット 2021-01-14 13 13 29" src="https://user-images.githubusercontent.com/15845907/104544102-55be7780-566a-11eb-84ea-c0a5e93f9c6b.png">
<img width="678" alt="スクリーンショット 2021-01-14 13 13 29" src="https://user-images.githubusercontent.com/15845907/104544102-55be7780-566a-11eb-84ea-c0a5e93f9c6b.png">

ついに拒否されてしまった。<BR />
これでは計測ができない。

## デフォルトフォントを表示させるようにして再挑戦
https://github.com/shimajima-eiji/Hosting/commit/63889f226b70fa034fabe9d9fe5cac2bdd934c08 で読み込めたら処理させるようにする

[検証サイト](https://5fffccafe47d7f00073f4748--speedtest-netlify.netlify.app)

実機で確認してみたが、期待した動作をしている。<BR />
とりあえず読ませられるけど端末の処理速度の問題だろうか、モバイルとPCのスコアの違いを体感で理解する事ができた。

<img width="723" alt="スクリーンショット 2021-01-14 13 49 46" src="https://user-images.githubusercontent.com/15845907/104546386-67564e00-566f-11eb-81a3-d79a48f9db4b.png">
<img width="730" alt="スクリーンショット 2021-01-14 13 49 54" src="https://user-images.githubusercontent.com/15845907/104546390-69b8a800-566f-11eb-876f-638d35543d94.png">

モバイル画面で適切なフォントになっていない気がするが、これはなんでだろう？<BR />
やはりCDNを使う方法を検討したほうが良さそうだ。

[前回：重い原因はフォントの**読み込み**が原因だと分かる。](https://github.com/shimajima-eiji/Hosting/blob/netlify-gatsby-font-speedtest/README.md)<BR />
[次回：Webフォントでも爆速で読み込ませたい](https://github.com/shimajima-eiji/Hosting/blob/netlify-gatsby-webfont-speedtest/README.md)
