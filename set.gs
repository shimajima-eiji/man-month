function set2SS ()
{
  /**
   * ユーザー定義
   */
  var yearsname2ad = {
    "元年": 2019,
  };
  const PROPERTIES = PropertiesService.getScriptProperties().getProperties();

  /**
   * システムロジック
   */

  function __scraping ()
  {
    var html = UrlFetchApp.fetch( PROPERTIES.url ).getContentText( 'UTF-8' ).replace( /\r?\n/g, "" ).replace( /[０-９]/g, function ( word )
    {
      return String.fromCharCode( word.charCodeAt( 0 ) - 0xFEE0 )
    } );
    var start = "<tbody>";
    var end = "</tbody>";
    return __cut( html, start, end );
  }

  var __match = {
    tr: /\<tr \w(.*?)\<\/tr\>/g,
    td: /\<td \w(.*?)\<\/td\>/g,
    year: /[\d元](.*)年/g,
    month: /年\d(.*)月/g,
    day: /月\d(.*)日/g,
    run: function ( str, pattern ) { return str.match( __match[ pattern ] ) },
  }
  function __cut ( str, sep )
  {
    return str.substring( str.indexOf( sep ) + sep.length, str.length );
  }
  function __rsubstring ( str, sep )
  {
    return str.substring( 0, str.indexOf( sep ) );
  }

  function __getYMD ( str, pattern )
  {
    var tmp = __match.run( str, pattern )[ 0 ]

    switch ( pattern )
    {
      case "year":
        tmp = yearsname2ad[ tmp ];
        break;

      case "month":
      case "day":
        tmp = tmp.substring( 1, tmp.length - 1 );
        if ( tmp.length == 1 ) tmp = "0" + tmp;
        break;
    }
    return tmp;
  }
  function __getDate ( str )
  {
    var year = __getYMD( str, "year" );
    var month = __getYMD( str, "month" );
    var day = __getYMD( str, "day" );
    return year + "-" + month + "-" + day;
  }

  /**
   * メイン
   */

  var table = __scraping()
  //  var table = test()

  /**
   * データクレンジング
   */
  var tr_items = __match.run( table, "tr" );
  var td_items = tr_items.map( function ( tr )
  {
    var tds = __match.run( tr, "td" );
    return tds.map( function ( td )
    {
      var clean_td = __rsubstring( __cut( td, ">" ), "<" )
        .trim()
        .replace( / /g, "" )
        .replace( /　/g, "" )
        .replace( /\(/g, "" )
        .replace( /\)/g, "" )
        ;
      if ( clean_td.indexOf( "年" ) > -1 ) clean_td = __getDate( clean_td );
      return clean_td;
    } );
  } );
  td_items.shift();

  /**
   * 使いやすいようにスプレッドシート用にヘッダーと採択する賃金を設定
   */
  var today = Moment.moment();
  var count = 1;
  var data = td_items.map( function ( td )
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

function test ()
{
  return '               <tr height="27" style="height: 20.25pt;">  <td class="xl63" height="27" style="border-width: 0.5pt; border-style: solid; width: 124pt; height: 20.25pt;"\
    width="250">\
    <div sizcache="29" sizset="92">\
      <div sizcache="29" sizset="92">\
        <div sizcache="29" sizset="99">\
          <div sizcache="29" sizset="99"><strong>&nbsp;&nbsp; 都道府県名</strong></div>\
        </div>\
      </div>\
    </div>\
  </td>\
  <td class="xl66" colspan="2"\
    style="border-width: 0.5pt 0.5pt 0.5pt 0px; border-style: solid solid solid none; width: 210pt;" width="100">\
    <strong>最低賃金時間額【円】</strong></td>\
  <td class="xl63" style="border-width: 0.5pt 0.5pt 0.5pt 0px; border-style: solid solid solid none; width: 187pt;"\
    width="50"><strong>発効年月日</strong></td>\
</tr>\
<tr align="center" height="27" style="height: 20.25pt;" valign="middle">\
  <td class="xl63" height="27"\
    style="border-width: 0px 0.5pt 0.5pt; border-style: none solid solid; width: 124pt; height: 20.25pt;" width="250">\
    北海道</td>\
  <td class="xl65" style="border-width: 0px 0.5pt 0.5pt 0px; border-style: none solid solid none; width: 105pt;"\
    width="100">861</td>\
  <td class="xl66" style="border-width: 0px 0.5pt 0.5pt 0px; border-style: none solid solid none; width: 105pt;"\
    width="100">(835)</td>\
  <td class="xl63" style="border-width: 0px 0.5pt 0.5pt 0px; border-style: none solid solid none; width: 187pt;"\
    width="50">令和元年10月3日</td>\
</tr>\
<tr height="27" style="height: 20.25pt;">\
  <td class="xl63" height="27"\
    style="border-width: 0px 0.5pt 0.5pt; border-style: none solid solid; width: 124pt; height: 20.25pt;" width="250">青　\
    森</td>\
  <td class="xl65" style="border-width: 0px 0.5pt 0.5pt 0px; border-style: none solid solid none; width: 105pt;"\
    width="100">790</td>\
  <td class="xl66" style="border-width: 0px 0.5pt 0.5pt 0px; border-style: none solid solid none; width: 105pt;"\
    width="100">(762)</td>\
  <td class="xl63" style="border-width: 0px 0.5pt 0.5pt 0px; border-style: none solid solid none; width: 187pt;"\
    width="50">令和元年10月4日</td>\
</tr>\
<tr height="27" style="height: 20.25pt;">\
  <td class="xl63" height="27"\
    style="border-width: 0px 0.5pt 0.5pt; border-style: none solid solid; width: 124pt; height: 20.25pt;" width="250">岩　\
    手</td>\
  <td class="xl65" style="border-width: 0px 0.5pt 0.5pt 0px; border-style: none solid solid none; width: 105pt;"\
    width="100">790</td>\
  <td class="xl66" style="border-width: 0px 0.5pt 0.5pt 0px; border-style: none solid solid none; width: 105pt;"\
    width="100">(762)</td>\
  <td class="xl63" style="border-width: 0px 0.5pt 0.5pt 0px; border-style: none solid solid none; width: 187pt;"\
    width="50">令和元年10月4日</td>\
</tr>\
<tr height="27" style="height: 20.25pt;">\
  <td class="xl63" height="27"\
    style="border-width: 0px 0.5pt 0.5pt; border-style: none solid solid; width: 124pt; height: 20.25pt;" width="250">宮　\
    城</td>\
  <td class="xl65" style="border-width: 0px 0.5pt 0.5pt 0px; border-style: none solid solid none; width: 105pt;"\
    width="100">824</td>\
  <td class="xl66" style="border-width: 0px 0.5pt 0.5pt 0px; border-style: none solid solid none; width: 105pt;"\
    width="100">(798)</td>\
  <td class="xl63" style="border-width: 0px 0.5pt 0.5pt 0px; border-style: none solid solid none; width: 187pt;"\
    width="50">令和元年10月1日</td>\
</tr>\
<tr height="27" style="height: 20.25pt;">\
  <td class="xl63" height="27"\
    style="border-width: 0px 0.5pt 0.5pt; border-style: none solid solid; width: 124pt; height: 20.25pt;" width="250">秋　\
    田</td>\
  <td class="xl65" style="border-width: 0px 0.5pt 0.5pt 0px; border-style: none solid solid none; width: 105pt;"\
    width="100">790</td>\
  <td class="xl66" style="border-width: 0px 0.5pt 0.5pt 0px; border-style: none solid solid none; width: 105pt;"\
    width="100">(762)</td>\
  <td class="xl63" style="border-width: 0px 0.5pt 0.5pt 0px; border-style: none solid solid none; width: 187pt;"\
    width="50">令和元年10月3日</td>\
</tr>\
<tr height="27" style="height: 20.25pt;">\
  <td class="xl63" height="27"\
    style="border-width: 0px 0.5pt 0.5pt; border-style: none solid solid; width: 124pt; height: 20.25pt;" width="250">山　\
    形</td>\
  <td class="xl65" style="border-width: 0px 0.5pt 0.5pt 0px; border-style: none solid solid none; width: 105pt;"\
    width="100">790</td>\
  <td class="xl66" style="border-width: 0px 0.5pt 0.5pt 0px; border-style: none solid solid none; width: 105pt;"\
    width="100">(763)</td>\
  <td class="xl63" style="border-width: 0px 0.5pt 0.5pt 0px; border-style: none solid solid none; width: 187pt;"\
    width="50">令和元年10月1日</td>\
</tr>\
<tr height="27" style="height: 20.25pt;">\
  <td class="xl63" height="27"\
    style="border-width: 0px 0.5pt 0.5pt; border-style: none solid solid; width: 124pt; height: 20.25pt;" width="250">福　\
    島</td>\
  <td class="xl65" style="border-width: 0px 0.5pt 0.5pt 0px; border-style: none solid solid none; width: 105pt;"\
    width="100">798</td>\
  <td class="xl66" style="border-width: 0px 0.5pt 0.5pt 0px; border-style: none solid solid none; width: 105pt;"\
    width="100">(772)</td>\
  <td class="xl63" style="border-width: 0px 0.5pt 0.5pt 0px; border-style: none solid solid none; width: 187pt;"\
    width="50">令和元年10月1日</td>\
</tr>\
<tr height="27" style="height: 20.25pt;">\
  <td class="xl63" height="27"\
    style="border-width: 0px 0.5pt 0.5pt; border-style: none solid solid; width: 124pt; height: 20.25pt;" width="250">茨　\
    城</td>\
  <td class="xl65" style="border-width: 0px 0.5pt 0.5pt 0px; border-style: none solid solid none; width: 105pt;"\
    width="100">849</td>\
  <td class="xl66" style="border-width: 0px 0.5pt 0.5pt 0px; border-style: none solid solid none; width: 105pt;"\
    width="100">(822)</td>\
  <td class="xl63" style="border-width: 0px 0.5pt 0.5pt 0px; border-style: none solid solid none; width: 187pt;"\
    width="50">令和元年10月1日</td>\
</tr>\
<tr height="27" style="height: 20.25pt;">\
  <td class="xl63" height="27"\
    style="border-width: 0px 0.5pt 0.5pt; border-style: none solid solid; width: 124pt; height: 20.25pt;" width="250">栃　\
    木</td>\
  <td class="xl65" style="border-width: 0px 0.5pt 0.5pt 0px; border-style: none solid solid none; width: 105pt;"\
    width="100">853</td>\
  <td class="xl66" style="border-width: 0px 0.5pt 0.5pt 0px; border-style: none solid solid none; width: 105pt;"\
    width="100">(826)</td>\
  <td class="xl63" style="border-width: 0px 0.5pt 0.5pt 0px; border-style: none solid solid none; width: 187pt;"\
    width="50">令和元年10月1日</td>\
</tr>\
<tr height="27" style="height: 20.25pt;">\
  <td class="xl63" height="27"\
    style="border-width: 0px 0.5pt 0.5pt; border-style: none solid solid; width: 124pt; height: 20.25pt;" width="250">群　\
    馬</td>\
  <td class="xl65" style="border-width: 0px 0.5pt 0.5pt 0px; border-style: none solid solid none; width: 105pt;"\
    width="100">835</td>\
  <td class="xl66" style="border-width: 0px 0.5pt 0.5pt 0px; border-style: none solid solid none; width: 105pt;"\
    width="100">(809)</td>\
  <td class="xl63" style="border-width: 0px 0.5pt 0.5pt 0px; border-style: none solid solid none; width: 187pt;"\
    width="50">令和元年10月6日</td>\
</tr>\
'.replace( /[０-９]/g, function ( word )
  {
    return String.fromCharCode( word.charCodeAt( 0 ) - 0xFEE0 )
  } );;
}
