var json;  // JSONPで取得した結果は後で使いたい

/**
 * JSONPの結果を取得したら呼び出される
 * 最低賃金を取得してプルダウン・ドロップダウンリストを作る
 * @param {json} get: JSONPの値
 */
function callback ( get )
{
  json = get;
  let func = ( navigator.userAgent.match( /Gecko/ ) )
    ? ( opt ) => document.wage.location.appendChild( opt )
    : ( opt ) => document.wage.location.add( opt );
  let add = ( value, text ) =>
  {
    let opt = document.createElement( "option" );
    opt.value = value;
    opt.text = text;
    func( opt );
  }

  let average = 0;
  json.minumum_wages.forEach( prefecture =>
  {
    add( prefecture.prefecture_code, prefecture.prefecture_name )
    average += prefecture.wage;
  } );
  json.minumum_wages.push( { wage: parseInt( average / json.minumum_wages.length ) } )
  add( json.minumum_wages.length, "全国平均" );

  // 未選択時にバグになるため追加。value=0はロードまで表示させたい項目のためJSではなくhtmlにベタ書きしている。
  json.minumum_wages.unshift( { wage: 0 } )
}

ids.common.wage = "wage_view";
function changelocation ( value )
{
  funcs.set( ids.common.wage, json.minumum_wages[ value ].wage, true );
  __check_wage();
}

function __check_wage ()
{
  // calc.jsから実施
  let wage = funcs.get( ids.common.wage );
  [
    ids.dispatch.price,
    ids.outsource.price_low,
    ids.outsource.price_high,
  ].map( ( id ) => document.getElementById( id ).style.background = ( funcs.get( id ) >= wage ) ? "white" : "pink" );
}

///* callbackのテストをしたい場合は以下コメントを外してindex.htmlのscript srcをコメントアウトする */
// callback( JSON.parse( '{"wage_rate":901,"minumum_wages":[{"prefecture_code":"北海道","wage":861,"effective_date":"2019-10-03"},{"prefecture_code":"青森","wage":790,"effective_date":"2019-10-04"},{"prefecture_code":"岩手","wage":790,"effective_date":"2019-10-04"},{"prefecture_code":"宮城","wage":824,"effective_date":"2019-10-01"},{"prefecture_code":"秋田","wage":790,"effective_date":"2019-10-03"},{"prefecture_code":"山形","wage":790,"effective_date":"2019-10-01"},{"prefecture_code":"福島","wage":798,"effective_date":"2019-10-01"},{"prefecture_code":"茨城","wage":849,"effective_date":"2019-10-01"},{"prefecture_code":"栃木","wage":853,"effective_date":"2019-10-01"},{"prefecture_code":"群馬","wage":835,"effective_date":"2019-10-06"},{"prefecture_code":"埼玉","wage":926,"effective_date":"2019-10-01"},{"prefecture_code":"千葉","wage":923,"effective_date":"2019-10-01"},{"prefecture_code":"東京","wage":1013,"effective_date":"2019-10-01"},{"prefecture_code":"神奈川","wage":1011,"effective_date":"2019-10-01"},{"prefecture_code":"新潟","wage":830,"effective_date":"2019-10-06"},{"prefecture_code":"富山","wage":848,"effective_date":"2019-10-01"},{"prefecture_code":"石川","wage":832,"effective_date":"2019-10-02"},{"prefecture_code":"福井","wage":829,"effective_date":"2019-10-04"},{"prefecture_code":"山梨","wage":837,"effective_date":"2019-10-01"},{"prefecture_code":"長野","wage":848,"effective_date":"2019-10-04"},{"prefecture_code":"岐阜","wage":851,"effective_date":"2019-10-01"},{"prefecture_code":"静岡","wage":885,"effective_date":"2019-10-04"},{"prefecture_code":"愛知","wage":926,"effective_date":"2019-10-01"},{"prefecture_code":"三重","wage":873,"effective_date":"2019-10-01"},{"prefecture_code":"滋賀","wage":866,"effective_date":"2019-10-03"},{"prefecture_code":"京都","wage":909,"effective_date":"2019-10-01"},{"prefecture_code":"大阪","wage":964,"effective_date":"2019-10-01"},{"prefecture_code":"兵庫","wage":899,"effective_date":"2019-10-01"},{"prefecture_code":"奈良","wage":837,"effective_date":"2019-10-05"},{"prefecture_code":"和歌山","wage":830,"effective_date":"2019-10-01"},{"prefecture_code":"鳥取","wage":790,"effective_date":"2019-10-05"},{"prefecture_code":"島根","wage":790,"effective_date":"2019-10-01"},{"prefecture_code":"岡山","wage":833,"effective_date":"2019-10-02"},{"prefecture_code":"広島","wage":871,"effective_date":"2019-10-01"},{"prefecture_code":"山口","wage":829,"effective_date":"2019-10-05"},{"prefecture_code":"徳島","wage":793,"effective_date":"2019-10-01"},{"prefecture_code":"香川","wage":818,"effective_dat":"愛媛","wage":790,"effective_date":"2019-10-01"},{"prefecture_code":"愛媛","wage":790,"effective_date":"2019-10-01"},{"prefecture_code":"高知","wage":790,"effective_date":"2019-10-05"},{"prefecture_code":"福岡","wage":841,"effective_date":"2019-10-04"},{"prefecture_code":"佐賀","wage":790,"effective_date":"2019-10-04"},{"prefecture_code":"長崎","wage":790,"effective_date":"2019-10-03"},{"prefecture_code":"熊本","wage":790,"effective_dat":"宮崎","wage":790,"effective_date":"2019-10-01"},{"prefecture_code":"大分","wage":790,"effective_date":"2019-10-01"},{"prefecture_code":"宮崎","wage":790,"effective_date":"2019-10-04"},{"prefecture_code":"鹿児島","wage":790,"effective_date":"2019-10-03"},{"prefecture_code":"沖縄","wage":790,"effective_date":"2019-10-03"}]}' ) )
