var CACHE = {
  url: '',
  // result: [],
};

const ids = {
  url: "url",
  apikey: "apikey",
};

function nullcheck ( obj )
{
  obj.style.background = ( obj.value ) ? "white" : "pink";
  return obj.value;
}

async function run ()
{
  // 関数
  let id2Obj = ( id ) => document.getElementById( id );

  // 実行判定
  const URL = nullcheck( id2Obj( ids.url ) );
  const APIKEY = nullcheck( id2Obj( ids.apikey ) );
  if ( !URL || !APIKEY ) return;

  if ( URL != CACHE.url )
  {
    CACHE.url = URL;
    const options = {
      headers: {
        'X-API-KEY': APIKEY,
      }
    };

    // curl
    CACHE.result = await fetch( URL + '?limit=100', options )
      .then( response => response.json() )
      .then( jsons => jsons.contents );
  }

  let response_json = CACHE.result;
  const header = Object.keys( response_json[ 0 ] ).filter( obj =>
  {
    //"createdAt" "updatedAt" "publishedAt"を削除。デバッグ時はtrueを返す
    return !obj.includes( "At" )
  } );

  // json
  document.export.json.value = '';
  let result = response_json.map( json =>
  {
    // json
    let jsons = {};
    header.map( id => jsons[ id ] = JSON.stringify( json[ id ] ) );
    document.export.json.value += JSON.stringify( jsons ) + "\n"

    // csv
    return header.map( index => json[ index ] );
  } );

  // csv
  document.export.csv.value = header.join( ',' ) + "\n" + result.join( '\n' );
}
