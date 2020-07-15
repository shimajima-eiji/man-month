/*
# 初期設定
```
var PROPERTIES = function() {
  return PropertiesService.getScriptProperties().getProperties();
}();
```
プロジェクトのプロパティにはそれぞれ、
- SERVICE_ID
- APIKEY
- PERMISSION_CONTENTID
を設定する

# 使い方
ソースコードで解説する。
```
function howtouse ( target )
{
  var fetch = microCMS();
  fetch.get( "slack" );  // fetch.slackのjsonを追加
  fetch.get( "line" );   // fetch.lineのjsonを追加
  fetch.get( "line" );   // この時はAPIをコールしない
  fetch.line;  // いったんfetchしたものは引数で指定した名前でも呼び出せる

  fetch.get( "notExist" );   // microCMSに存在するが、propertyに登録されていないものは参照できない
}
```
*/

var microCMS = function ()
{
  const SERVICE_ENDPOINT = "https://" + PROPERTIES.SERVICE_ID + ".microcms.io/api/v1/"
  const OPTIONS = { headers: { "X-API-KEY": PROPERTIES.APIKEY } };
  const LIMIT = 100;
  const KEYID = "id";
  /*
    TODO: microCMSの仕様として、limitが最大何件取れるか？
    ダメならoffsetを取ってセルフでページング処理をするしかない。
  */

  function _run ( contentId )
  {
    var contents_endpoint = SERVICE_ENDPOINT + contentId + "?limit=" + LIMIT;

    debug( Module );
    return Module.fetch( contents_endpoint, OPTIONS );
  };
  function fetchCall ( target )
  {
    // microCMSで設定しているコンテンツだけ配信する
    if ( Module.findValue_array( fetched.property.contents, KEYID, target ).length == 0 )
    {
      print( "要素が存在しません" )
      return null;
    }

    // 過去に未実施の場合だけAPIコール
    if ( !fetched.hasOwnProperty( target ) )
    {
      var result = _run( target );
      if ( result ) fetched[ target ] = result;
    }
    return fetched[ target ];
  };
  function find(contentId, value) {
    return Module.findValue_array( fetched[contentId].contents, KEYID, value )[0]
  };

  var fetched = {
    property: _run( PROPERTIES.PERMISSION_CONTENTID ),
    get: fetchCall,
    find: find
  };

  return fetched;
};
