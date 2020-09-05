function notify_tv(){
  const LINE_TOKEN = "notify_token_gas";
  const SERVICE_ID = "nomuraya-tutorial";
  const APIKEY = "6615a5a4-b894-445e-b979-24612d1a018c";
  var today = Snippets.Module.date();
  const APIID = "tv_" + today.lang( "en" ).format( "ddd" ).toLowerCase();

  var target = Snippets.microCMS( SERVICE_ID , APIKEY )
  var contents = target.content(APIID).contents.map(function(obj) {
    if(obj.hours < 0) obj.hours *= -1;
    return obj;
  } ).sort(function(a,b){return a.hours - b.hours});

  // メッセージを整形して取り出す。
  var message = contents.map(function(obj) {
    var hour = parseInt(obj.hours / 100);
    if(hour>=24) hour = 24 - hour % 24;  // 無尽蔵に無茶苦茶な数字を入れられるので24時間の商の余の差を適用する

    var minute = obj.hours % 100;
    if(minute>=60) minute -= 60;  // 最大値が99なので単純に60の差で解決出来る

    var tmp = "";
    // 特番に設定された日付が指定日か、特番ではない場合は通知する
    if(!obj.special || obj.special && Snippets.Module.date(obj.special).diff(today, "days") == 0){
      tmp = tmp + hour + "時" + ((minute) ? minute + "分：" : "：") + obj.title;
      if (obj.note) tmp = tmp + "\n（" + obj.note + "）\n";
    }
    return tmp;
  }).join("\n");
  Logger.log(today.format("【番組表 YYYY年M月D日】") + "\n" + message);

  Snippets.Line().send( message, LINE_TOKEN );
}
