// 使い方。呼び出し元で誤作動すると危険なので、内容はコメントアウト
function quickstart ()
{
  /*
  const SERVICE = PropertiesService.getScriptProperties().getProperty("service");
  const APINAME = PropertiesService.getScriptProperties().getProperty("apiname");
  const APIKEY = PropertiesService.getScriptProperties().getProperty("apikey");
  const KEY = PropertiesService.getScriptProperties().getProperty("key");
  const VALUE = PropertiesService.getScriptProperties().getProperty("value");

  var data = microCMS( SERVICE, APINAME, APIKEY );
//  Logger.log( data.filter( KEY, VALUE ) );
  Logger.log( data.value( KEY, VALUE));
//  Logger.log( data.output_json() );
//  Logger.log( data.output_csv() );
//  Logger.log( WM_jsoncsv.csv2jsons(data.output_csv(), true) );
  */
}

/**
 * @params:
 *   - service(string): service name
 *   - api(string): API name
 *   - key(string): API key or write API key
 *   - json(string): POST case. data Object({key: value})
 * @return
 */
var microCMS = function ( service, api, key, json )
{
  if ( !service || !api || !key ) return false;
  /***
  // 定数（運用）
  ***/
  const jsons2jsonString = WM_jsoncsv.jsons2string;
  const jsons2csv = WM_jsoncsv.jsons2csv;
  const ENDPOINT = "https://" + service + ".microcms.io/api/v1/" + api + "?limit=100";

  /**
   * @why GETとPOSTでオプションが異なる
   * @params:
   *   key(string): APIKEYかWRITE-APIKEYのどちらか
   *   json(json): POSTのみ。登録するデータ
   * @return リクエスト
   */
  function GETheader ( key )
  {
    if ( key ) return { headers: { "X-API-KEY": key } };
  }
  function POSTheader ( key, json )
  {
    if ( key && json ) return {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-WRITE-API-KEY": key
      },
      body: JSON.stringify( json )
    };
  }

  /**
   * @why 曜日ごとに処理したい場合など、特定のキーだけを集めたい時がある
   * @return 連想配列
   */
  function filter ( key, value )
  {
    var result;
    if ( Array.isArray( response ) )
    {
      result = response.filter( function ( json )
      {
        if ( json[ key ] )
        {
          if ( json[ key ] == value ) return true;  // テキストなど単一要素
          if ( Array.isArray( json[ key ] ) && json[ key ].indexOf( value ) > -1 ) return true;  // セレクトなど複数要素
        }
      } );
    } else
    {
      result = response[ key ];
    }
    return result;
  }
  
  /**
   * @why ピンポイントに欲しいものを拾ってくる。リストの場合は最初に取れたものを決め打ちする。
   * @params:
   *   search_key(microCMS Object): リスト型を想定、検索対象のキー。オブジェクト型の場合は取得キーとして扱う
   *   search_value(microCMS Object): リスト型を想定、キーの値がvalueだった場合の全件（ただし、最初の要素のみを取得するためユニークを想定）
   *   get_key(microCMS Object): リスト型を想定、取得対象のキー。検索キーと取得キーが同じ場合は省略できるが、返ってくる値はsearch_valueなので無意味
   * @return value
   */
  function value ( search_key, search_value, get_key )
  {
    var key = ( get_key ) ? get_key : search_key;
    var result = filter( search_key, search_value );
    return ( Array.isArray( result ) ) ? result[ 0 ][ key ] : result;
  }

  /**
   * @why コンテンツのバックアップを取ったり、ファイルで他の場所に格納したい場合を想定
   * @params:
   *   (options)
   *    contents(jsons): データを加工した場合に使用する
   *    delete_date_flag(boolean): 投稿日・更新日・公開日などの情報が不要の場合。あっても困らない。
   * @return string: JSON.parseでjsonとして使えるもの
   */
  function output_json ( options )
  {
    var contents = ( options && options.contents ) ? options.contents : response;
    var result;
    if ( options && options.delete_date_flag )
    {
      result = contents.map( function ( jsons )
      {
        delete jsons.createdAt;
        delete jsons.updatedAt;
        delete jsons.publishedAt;
        return jsons;
      } );
    } else
    {
      result = contents;
    }
    return jsons2jsonString( result );
  }

  /**
   * @why 結果をスプレッドシートなどに保存したい場合を想定
   * @params options(object): header for fetch
   * @return array[json]
   */
  function output_csv ( options )
  {
    var jsonstrings = output_json( options );
    var jsons = jsonstrings.split( "\n" ).map( function ( jsonstr ) { return JSON.parse( jsonstr ); } );
    return jsons2csv( jsons );
  }

  /**
   * メイン
   */
  var options = ( json ) ? POSTheader( key, json ) : GETheader( key );
  if ( !options ) return false;

  var tmp = JSON.parse( UrlFetchApp.fetch( ENDPOINT, options ) );
  const response = ( tmp.contents ) ? tmp.contents : tmp;
  if ( !json )
  {
    return {
      contents: response,
      filter: filter,
      value: value,
      output_json: output_json,
      output_csv: output_csv,
    };
  }
}
