# スピードテスト
- [いつもの](https://developers.google.com/speed/pagespeed/insights/?hl=ja)

以下、画像は上がトップページで下が個別ページ

## まずはまっさらな状態
<img width="696" alt="スクリーンショット 2021-01-16 15 54 35" src="https://user-images.githubusercontent.com/15845907/104800338-7a098800-5813-11eb-92bc-a6ec76499a08.png">
<img width="698" alt="スクリーンショット 2021-01-16 15 55 51" src="https://user-images.githubusercontent.com/15845907/104800372-7c6be200-5813-11eb-9179-80bdf0ad524e.png">

- [トップ](https://60028cc573551b000706c512--speedtest-netlify.netlify.app)
- [個別](https://60028cc573551b000706c512--speedtest-netlify.netlify.app/milkdb)
モバイル部門ではじめて100点を取った記念。<BR />　
インデックスでmicroCMSの画像を取るのをやめた場合と、個別ページで画像を取っていたページの比較がしたかったから、**単純にmicroCMSから画像をもらってくる事は危険**だということが分かる。<BR />
直近では問題なさそうだが、トップページのスコアが目減りしていくのでページネーションなど対策は必要。

## ウェブフォントを読ませようとした
<img width="699" alt="スクリーンショット 2021-01-16 17 07 23" src="https://user-images.githubusercontent.com/15845907/104806781-6c590000-581d-11eb-9274-a32119a04f3f.png">
<img width="703" alt="スクリーンショット 2021-01-16 17 08 05" src="https://user-images.githubusercontent.com/15845907/104806783-6ebb5a00-581d-11eb-94ab-b87a8a49dbca.png">

- [トップ](https://6002997593df3600079f95be--speedtest-netlify.netlify.app)
- [個別](https://6002997593df3600079f95be--speedtest-netlify.netlify.app/milkdb)

フォントをどれだけ適用するかによる。単純に描画の問題っぽい。<BR />
Gatsbyの公式で対応してくれるものじゃないと悲しい結果になったから、最適化してくれるプラグインの存在はありがたい。
