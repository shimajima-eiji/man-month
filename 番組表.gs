/**
 * テレビ番組戦争（家族）が過激すぎるので思った以上に作り込みすぎた
 * APIスキーマが膨れ上がるので都度バージョンアップする
 * [スキーマ.json](https://github.com/shimajima-eiji/Hosting/wiki/[microCMS])
 *
 * 【必須】
 * title:   番組名
 * hours:   放送開始時間
 * special: 特番。この一回きりなので特殊な処理が必要
 * これら以外は存在チェックしてから使う
 */
var notify_tv = function ()
{
  /***
  // 定義
  ***/
  const SERVICE_ID = Snippets.PROPERTIES.SERVICE_ID;
  const APIKEY = Snippets.PROPERTIES.APIKEY;
  const APIID = PropertiesService.getScriptProperties().getProperty( "tv_apiid" )
  const LINE_TOKEN = PropertiesService.getScriptProperties().getProperty( "line_token" );
  const today = Snippets.Module.date().add( 1, "days" );

  /***
  // fetch
  ***/
  var contents = Snippets.microCMS( SERVICE_ID, APIKEY ).content( APIID ).contents
    .filter( function ( obj )
    {
      return obj.week.some( function ( week )
      {
        return week == today.format( "dddd" )
      } );
    } )
    .map( function ( obj )
    {
      if ( obj.hours < 0 ) obj.hours *= -1;
      return obj;
    } )
    .sort( function ( a, b ) { return a.hours - b.hours } );

  /**
   * message作成時に時間処理が必要なので集約
   * 時間：無尽蔵に無茶苦茶な数字を入れられるので24時間の商の余の差を適用する。24(2400)時以上なら24時を追加して25時表記に対応する
   * 分の最大値は99なので、単純に60の差で解決出来るため時間より複雑ではない。
   * @input(Number)  HHMM(時・分)を想定。ソートのためぶっ飛んだ時間が来る可能性も考慮
   * @return(string) ○時 or ○時○分
   */
  function num2date ( input )
  {
    var hour = parseInt( input / 100 );
    if ( hour >= 24 ) hour = 24 + hour % 24;

    var minute = input % 100;
    if ( minute >= 60 ) minute -= 60;

    return hour + "時" + ( ( minute ) ? minute + "分" : "" );
  }

  /***
  //メッセージを整形して取り出す。
  // ※上記【必須】項目の要件に従い、存在チェックを必ず実施する
  ***/
  var message = contents.map( function ( obj )
  {
    // 特番に設定された日付が指定日か、特番ではない場合は通知する
    if ( obj.special && !Snippets.Module.date( obj.special ).diff( today, "days" ) == 0 ) return;

    var result = "";
    result = num2date( obj.hours );
    if ( obj.endtime ) result = result + "～" + num2date( obj.endtime );
    result = result + "　" + obj.title;

    // 以下、オプション
    if ( obj.channel_number ) result = result + "／" + obj.channel_number + "ch"
    if ( obj.channel_name ) result = result + "：" + obj.channel_name + "系列"
    if ( obj.user ) result = result + "\nブッキング相談：" + obj.user + "\n"
    if ( obj.note ) result = result + "\n（ " + obj.note + " ）\n";

    return result;
  } ).join( "\n" );

  message = "\n" + today.format( "【番組表 YYYY年M月D日】" ) + "\n" + message;
  Snippets.Line().send( message, LINE_TOKEN );
}

