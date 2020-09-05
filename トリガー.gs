/*
今日から見て対象の日付を指定する
実行のタイミングはGASイベントトリガーに準拠

※当日から月初や週末を指定する場合は、対象日を引数にしてdateをこねくり回すようにする
*/

function today ()
{
  unemployment_insurance();  // 失業給付
  notify_tv();
  notify_trash( 0 );  // ゴミの日
}

function tommorow ()
{
  notify_trash( 1 );  // ゴミの日
}
