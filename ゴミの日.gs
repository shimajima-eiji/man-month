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

# TODO
これはsnippetsの機能ではないため、外プロジェクトに移行する

*/
function test(){
  today = Snippets.Module.date();
  var a = "燃えないゴミ or ペットボトル"
  Logger.log();
}

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
  var content = Snippets.microCMS().value( APIID, date.lang( "en" ).format( "dddd" ).toLowerCase() );
  if ( NOSEND.indexOf(content) > -1 ) return;  // includesが使えない

  var header = ( day ) ? MESSAGES.tommorow : MESSAGES.today;
  var message = "";

  /**
   * 曜日ごとに特殊な条件がある場合、_(week)を本文に追加
   */
  // 週により指定がある場合
  var first_day = Snippets.Module.date(date.format("YYYY/MM/DD")).date(1);
  var week = Math.ceil((first_day.day() + date.date())/7);
  var value = Snippets.microCMS().value("home", content + "_" + week);
  if(value) message = value;

  // 隔週の場合
  if(content == "friday") content = content.split(" or ")[today.week()%2];

  message = MESSAGES.pype + header + message + content + MESSAGES.footer + MESSAGES.pype;
  Snippets.Line().send( message, LINE_TOKEN );
}

function today ()
{
  notify_trash( 0 );
}
function tommorow ()
{
  notify_trash( 1 );
}
