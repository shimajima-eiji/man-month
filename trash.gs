/*
# 更新履歴:コミットログ
## [2020/07/27][ver0.1.0] trash:最適化/microCMS:呼び出しを簡素化/Module:astypeとエラーキャッチ
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

  var date = Module.date().add( day, 'days' ).lang( "en" ).format( "dddd" ).toLowerCase();  // dayの曜日(英語)を取得
  var content = microCMS().value( APIID, date );
  if ( NOSEND.indexOf(content) > -1 ) return;  // includesが使えない

  var header = ( day ) ? MESSAGES.tommorow : MESSAGES.today;
  var message = MESSAGES.pype + header + content + MESSAGES.footer + MESSAGES.pype;
  Line().send( message, LINE_TOKEN );
}

function today ()
{
  notify_trash( 0 );
}
function tommorow ()
{
  notify_trash( 1 );
}
