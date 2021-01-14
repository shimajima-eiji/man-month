# スピードテスト
- [いつもの](https://developers.google.com/speed/pagespeed/insights/?hl=ja)
- [検証サイト](https://5fff31c28df2360a8f7f0980--speedtest-netlify.netlify.app)

# 2021/01/14 12:00時点の検証結果
## index
<img width="677" alt="スクリーンショット 2021-01-14 12 00 59" src="https://user-images.githubusercontent.com/15845907/104539059-3c183280-5660-11eb-8a8e-98f4192454e3.png">
<img width="677" alt="スクリーンショット 2021-01-14 12 01 16" src="https://user-images.githubusercontent.com/15845907/104539067-3de1f600-5660-11eb-9f74-21c7697ea1c5.png">

## 埋め込みなし
<img width="678" alt="スクリーンショット 2021-01-14 12 03 38" src="https://user-images.githubusercontent.com/15845907/104539354-ad57e580-5660-11eb-8f2e-24a32d963006.png">
<img width="675" alt="スクリーンショット 2021-01-14 12 03 48" src="https://user-images.githubusercontent.com/15845907/104539358-afba3f80-5660-11eb-949d-db9559375945.png">

## 埋め込みあり
<img width="679" alt="スクリーンショット 2021-01-14 12 02 55" src="https://user-images.githubusercontent.com/15845907/104539408-ce203b00-5660-11eb-86ca-58053214048e.png">
<img width="679" alt="スクリーンショット 2021-01-14 12 02 45" src="https://user-images.githubusercontent.com/15845907/104539410-cf516800-5660-11eb-9c10-fb1b02874c79.png">

埋め込みありのページが遅いのは当然か。<BR>
とはいえ、その他のページは[indexだけを作った場合と比較しても大差ない](https://github.com/shimajima-eiji/Hosting/blob/netlify-gatsby-index-speedtest/README.md)ので、プラグインに問題があると考えるのが自然だろう。<BR>
[次はレイアウトにフォントを入れて全体のパフォーマンスを測る](https://github.com/shimajima-eiji/Hosting/blob/netlify-gatsby-font-speedtest/README.md)
