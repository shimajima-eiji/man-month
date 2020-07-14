/*
# 使い方
ソースコードで解説する。
```
function howtouse ( target )
{
  var fetch = microCMS();
  fetch.fetch( "slack" );  // fetch.slackのjsonを追加
  fetch.fetch( "line" );   // fetch.lineのjsonを追加
  fetch.fetch( "line" );   // この時はAPIをコールしない
  fetch.line;  // いったんfetchしたものは引数で指定した名前でも呼び出せる
}
```
*/
function howtouse ( target )
{
  var fetch = microCMS();
  fetch.get( "line2" );
  print( fetch );
}

var microCMS = function ()
{
  const OPTIONS = { headers: { "X-API-KEY": PROPERTIES.APIKEY } };
  const LIMIT = 100;
  /*
    TODO: microCMSの仕様として、limitが最大何件取れるか？
    ダメならoffsetを取ってセルフでページング処理をするしかない。
  */

  function _run ( contentId )
  {
    var ENDPOINT = PROPERTIES.ENDPOINT + contentId + "?limit=" + LIMIT;

    debug( Module );
    return Module.fetch( ENDPOINT, OPTIONS );
  };
  function fetchCall ( target )
  {
    // 過去に未実施の場合だけAPIコール
    if ( !fetched.hasOwnProperty( target ) )
    {
      var result = _run( target );
      if ( result ) fetched[ target ] = result;
    }
    return fetched[ target ];
  }

  var fetched = {
    get: fetchCall
  };

  return fetched;
};
