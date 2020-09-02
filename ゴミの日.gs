/*
# 更新履歴:コミットログ
## [2020/09/02][ver0.1.0] 何週目・隔週といったケースに対応
[解説](https://qiita.com/nomurasan/items/fc45214cf5f60a021bfd)

## [2020/07/27][ver0.0.0] snippetsから移行
運用開始。使い方: https://github.com/shimajima-eiji/Hosting/wiki/[共通]-github-changesが使えないサービスのバージョン管理

# 定数
- NOSEND: ゴミの日でない場合、何もしないための値。keyがない場合とvalueがなしの2パターン、
- APIID: GASで使うAPI名のID(contentId)
- LINE_TOKEN: [LINE notify](https://notify-bot.line.me/my/)に登録したトークン
- MESSAGES: 出力設定

# 一時変数
- date: 今日か明日(day)の日付を取って、曜日を英語で受け取る
- content: 曜日に対応するゴミ情報

# 運用
タイムトリガーではない関数はvarで変数名に格納する。

# API
[参照](https://github.com/shimajima-eiji/Hosting/wiki/[microCMS][GAS]-APIスキーマ（特殊例）)

selectAPIで設定したコンテンツを呼べるようにしており、コンテンツ名はキーが流出しても都度変更して取得できないようにしている。
API valueの内容は変更する必要がない。
*/

/**
 * ゴミの日通知
 * @day(number): 今日なら0、明日なら1…のように、今日を起点として対象となる日付
 * @return none
 */
var notify_trash = function ( day )
{
  const NOSEND = ["なし", undefined];
  const APIID = "home";
  const LINE_TOKEN = "notify_token_trash";
  const MESSAGES = {
    pype: "\n～～～～～～～～～～～～～～～～～\n",
    today: "今日は",
    tommorow: "明日は",
    footer: "の日！"
  };

  var date = Snippets.Module.date().add( day, 'days' );  // dayの曜日(英語)を取得
  var key = date.lang( "en" ).format( "dddd" ).toLowerCase();
  var content = Snippets.microCMS().value( APIID, key );
  if ( NOSEND.indexOf(content) > -1 ) return;  // includesが使えない

  var header = ( day ) ? MESSAGES.tommorow : MESSAGES.today;
  var message = "";

  /**
   * 曜日ごとに特殊な条件がある場合、_(week)を本文に追加
   */
  // 週により指定がある場合
  var first_day = Snippets.Module.date(date.format("YYYY/MM/DD")).date(1);
  var week = Math.ceil((first_day.day() + date.date())/7);
  var value = Snippets.microCMS().value(APIID, key + "_" + week);
  if(value) message = value;

  // 隔週の場合
  if(key == "friday") content = content.split(" or ")[date.week()%2];

  message = MESSAGES.pype + header + message + content + MESSAGES.footer + MESSAGES.pype;
  Snippets.Line().send( message, LINE_TOKEN );
}

/**
 * 以下、タイムトリガー
 */
function today ()
{
  notify_trash( 0 );
}
function tommorow ()
{
  notify_trash( 1 );
}
