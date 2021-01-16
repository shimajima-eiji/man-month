# スピードテスト
- [いつもの](https://developers.google.com/speed/pagespeed/insights/?hl=ja)
- [検証サイト](https://6001df2814eaf35b9cab82af--speedtest-netlify.netlify.app)

以下、画像は上がトップページで下が個別ページ

## まずはまっさらな状態
<img width="696" alt="スクリーンショット 2021-01-16 15 54 35" src="https://user-images.githubusercontent.com/15845907/104800338-7a098800-5813-11eb-92bc-a6ec76499a08.png">
<img width="698" alt="スクリーンショット 2021-01-16 15 55 51" src="https://user-images.githubusercontent.com/15845907/104800372-7c6be200-5813-11eb-9179-80bdf0ad524e.png">

- [トップ](https://60028cc573551b000706c512--speedtest-netlify.netlify.app)
- [個別](https://60028cc573551b000706c512--speedtest-netlify.netlify.app/milkdb)
モバイル部門ではじめて100点を取った記念。<BR>
インデックスでmicroCMSの画像を取るのをやめた場合と、個別ページで画像を取っていたページの比較がしたかったから、**単純にmicroCMSから画像をもらってくる事は危険**だということが分かる。

## ウェブフォントを読ませようとした
<img width="700" alt="スクリーンショット 2021-01-16 16 05 23" src="https://user-images.githubusercontent.com/15845907/104804259-affb3c00-5814-11eb-9c05-f33b6cf7fc68.png">

計測不可。<BR />
この後適用箇所を制限したりライフサイクルを変えたり代替フォントを指定するなどで対応したが、全体的にフォントを変更したい場合は使えないので、そもそも導入を見送る方が良さそうだ。
  
ただし、通常利用には全く問題はないので、計測したい時だけ開発環境でフォントを外すといった対応をするのが良さそうだ。
