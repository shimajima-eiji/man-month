/*
# 定数
- NOSEND: ゴミの日でない場合、何もしないための値。keyがない場合とvalueがなしの2パターン、
- APIID: GASで使うAPI名のID(contentId)
- LINE_TOKEN: [LINE notify](https://notify-bot.line.me/my/)に登録したトークン
- MESSAGES: 出力設定

# 一時変数
- date: 今日か明日(day)の日付を取って、曜日を英語で受け取る
- content: 曜日に対応するゴミ情報
*/

/**
 * ゴミの日通知
 * @day(number): 今日なら0、明日なら1…のように、今日を起点として対象となる日付
 * @return none
 */
var notify_trash = function ( day )
{
  const NOSEND = ["なし", undefined];
  const APIID = "notify_trash";
  const LINE_TOKEN = "notify_token_gas";
  const MESSAGES = {
    pype: "\n～～～～～～～～～～～～～～～～～\n",
    today: "今日は",
    tommorow: "明日は",
    footer: "の日！"
  };

  var date = Snippets.Module.date().add( day, 'days' );
  var key = date.lang( "en" ).format( "dddd" ).toLowerCase();  // dayの曜日(英語)を取得
  var content = Snippets.microCMS().value( APIID, key );
  if ( NOSEND.indexOf(content) > -1 ) return;  // includesが使えない

  var header = ( day ) ? MESSAGES.tommorow : MESSAGES.today;
  var message = "";

  /**
   * 曜日ごとに特殊な条件がある場合、_(week)を本文に追加
   */
  // 週により指定がある場合
  var first_day = Snippets.Module.date(date.format("YYYY/MM/DD")).date(1);
  var week = Math.ceil((date.date() - first_day.day())/7);
  var value = Snippets.microCMS().value(APIID, key + "_" + week);
  if(value) message = value;

  // 隔週の場合
  if(key == "friday") content = content.split(" or ")[date.week()%2];

  message = MESSAGES.pype + header + message + content + MESSAGES.footer + MESSAGES.pype;
  Snippets.Line().send( message, LINE_TOKEN );
}
