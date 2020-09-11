// # Usege
function quickstart ()
{
  const testData = [["A","" ], ["", "B"], ["A","" ], ["", "B"]];
  Logger.log( csv2jsons(testData) );
}

/**
 * @params:
 *   json(json)
 * @return string
 */
function json2jsonString ( json )
{
  return JSON.stringify( json );
}

/**
 * @params:
 *   jsons(array): 要素はjson
 * @return string
 */
function jsons2jsonString ( json )
{
  return json.map( function ( obj ) { return json2jsonString( obj ); } ).join( "\n" );
}

/**
 * @why JSON文字列からCSV変換する。
 * @params:
 *   json(json):
 *   header(boolean): headerをつけて返す
 *
 */
function json2csv ( json, header )
{
  var headers = Object.keys( json );
  var result = headers.map( function ( key, index )
  {
    var tmp = ( json[ key ] ) ? json[ key ] : "";  // nullを空白にする
    return ( Array.isArray( tmp ) ) ? '"' + tmp.join( "," ) + '"' : tmp;  // 配列が格納されていた場合、クォーテーションでラップする
  } );
  result.unshift();
  if ( header ) result.shift( headers );
  return result;
}

/**
 * @why jsonsからCSV変換する。
 * @params:
 *   jsons(array)
 * @return array[array]
 */
function jsons2csv ( jsons )
{
  const range = "";
  var header = Object.keys( jsons[ 0 ] );
  var result = jsons.map( function ( json ) { return json2csv( json, false ) } );
  result.unshift( header );
  return result;
}

/**
 * @why スプレッドシートをjsonsに変換する。csvの性質上jsonにはならないので注意
 * @params:
 *   csv(array[array]):
 *   header(boolean): array[0]がヘッダーならtrue。不要なら取得後にshift()で削除できる
 * @return jsons
 */
function csv2jsons ( csv, header )
{
  if ( !Array.isArray( csv ) || !Array.isArray( csv[ 0 ] ) || csv[ 0 ].length == 0 ) return;

  // rangeやスプレット構文が使えないのでforで作成
  const range = Snippets.range;
  var headers = ( header ) ? csv[ 0 ] : range( csv[ 0 ].length )
  var tmp;
  var result = csv.map( function ( row, i )
  {
    if ( i == 0 ) return;

    tmp = {};
    headers.map( function ( column, ii )
    {
      if ( !row[ ii ] ) return;

      tmp[ column ] = ( Array.isArray( row[ ii ] ) )
        ? csv2jsons( row[ ii ], true )
        : row[ ii ];
    } );
    return tmp;
  } );
  result.shift();
  return result;
}
