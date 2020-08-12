function set2SS ()
{
  /**
   * ユーザー定義
   */
  const years = [
    {
      name: "令和",
      start: 2019,
    },
  ];

  /**
   * データクレンジング
   */    
  function replaces ( str )
  {
    return getDate( str ).trim()
      .replace( / /g, "" )
      .replace( /　/g, "" )
      .replace( /\)/g, "" )
      .replace( /\(/g, "" )
      .replace( /[０-９]/g, function ( word )
      {
        return String.fromCharCode( word.charCodeAt( 0 ) - 0xFEE0 )
      } );
  }
  function getDate ( str )
  {
    // 日付でなければやらない
    if ( str.indexOf( "年" ) == -1 ) return str;

    // 年号を西暦に直す。
    var ad = -1;  // 元年分を減らしておくため-1
    years.forEach( function ( year )
    {
      if ( str.indexOf( year.name ) > -1 )
      {
        ad += year.start;
        str = str.replace( year.name, "" );
      }
    } );

    // 元年は1年
    str = str.replace( "元", 1 )

    // 西暦を算出して-でつなげる
    var split = str.split( "年" );  // 2桁以上の検出に対応
    return ( Number( split[ 0 ] ) + ad )
      + "-"
      + split[ 1 ].replace( "月", "-" ).replace( "日", "" );
  }

  /**
   * メイン
   */
  const URL = PropertiesService.getScriptProperties().getProperties().url;
  const content = UrlFetchApp.fetch( URL ).getContentText();
  const $ = Cheerio.load( content );

  var result = [];
  var pointer = -1;
  const EXCLUDE_COLUMN = 3; // 最初の行だけおかしなものがあるので除外
  const COLUMNS = 4;
  $( "td" ).each( function ( i, td )
  {
    if ( i < EXCLUDE_COLUMN ) return;
    if ( i % COLUMNS == EXCLUDE_COLUMN )
    {
      result.push( [] );
      pointer++;
    }
    result[ pointer ].push( replaces( $( td ).text() ) );
  } );

  /**
   * 使いやすいようにスプレッドシート用にヘッダーと採択する賃金を設定
   */
  var today = Moment.moment();
  var count = 1;
  var data = result.map( function ( td )
  {
    if ( today.isBefore( Moment.moment( td[ 4 ] ) ) ) td[ 2 ] = td[ 3 ];
    td.splice( 2, 1 );
    td.unshift( count );
    count++;
    return td;
  } );
  data.unshift( [ PROPERTIES.code, PROPERTIES.name, PROPERTIES.wage, PROPERTIES.date ] );

  /**
   * スプレッドシートに転記
   */
  const sheet = SpreadsheetApp.getActiveSheet().getRange( 1, 1, data.length, data[ 0 ].length );
  sheet.setValues( data );
}
