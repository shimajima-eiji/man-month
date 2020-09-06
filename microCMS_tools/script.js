function nullcheck ( obj )
{
  obj.style.background = ( obj.value ) ? "white" : "pink";
  return obj.value;
}

async function run ()
{
  // 関数
  let id2Obj = ( id ) => document.getElementById( id );
  const ids = {
    url: "url",
    apikey: "apikey",
  };

  // 実行判定
  const url = nullcheck( id2Obj( ids.url ) );
  const apikey = nullcheck( id2Obj( ids.apikey ) );
  if ( !url || !apikey ) return;

  const options = {
    headers: {
      'X-API-KEY': apikey,
    }
  };

  // curl
  let result = [];
  result = await fetch( url + '?limit=100', options )
    .then( response => response.json() )
    .then( jsons => jsons.contents );

  // データ整形
  const header = Object.keys( result[ 0 ] ).filter( obj =>
  {
    //"createdAt" "updatedAt" "publishedAt"を削除。デバッグ時はtrueを返す
    return !obj.includes( "At" )
  } );

  result = result.map( json => header.map( index => ( index == "id" ) ? "" : json[ index ] ) );
  document.form.csv.value = header.join( ',' ) + "\n" + result.join( '\n' );
}
