/*
# 使い方
ソースコードで解説する。
```
function howtouse ( target )
{
  var fetch = microCMS();
  fetch.fetch( "line" );
  fetch.fetch( "line" );  // この時はAPIをコールしない
  fetch.line;  // fetchした要素は自動的に追加されるので、後で呼ぶことはない
}
```
*/

var microCMS = function ()
{
  /*
    TODO: microCMSの仕様として、limitが最大何件取れるか？
    ダメならoffsetを取ってセルフでページング処理をするしかない。
  */
  function _run ( contentId, apikey )
  {
    const LIMIT = 100;
    const ENDPOINT = PROPERTIES.ENDPOINT + contentId + "?limit=" + LIMIT;
    const OPTIONS = ( apikey ) ? { headers: { "X-API-KEY": apikey } } : null;

    debug( Module );
    return Module.fetch( ENDPOINT, OPTIONS );
  };
  function filter ( target )
  {
    // 既に実施していたらAPIをコールせず、値だけ返す
    if ( fetched.hasOwnProperty( target ) )
    {
      return fetched[ target ];
    }

    var apikey = fetched.property.contents.filter( function ( content )
    {
      return content.id == target;
    } )[ 0 ].value;

    // 呼び出されたら追記すると同時に、値も返却する。
    fetched[ target ] = _run( target, apikey );
    return fetched[ target ];
  }

  var fetched = {
    fetch: filter,
    property: _run( PROPERTIES.PROPERTY, PROPERTIES.APIKEY ),  // 不用意にAPIをコールしないように保持
  };

  return fetched;
};
