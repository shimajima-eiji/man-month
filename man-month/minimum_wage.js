/**
 * 即時関数
 * 最低賃金を取得してプルダウン・ドロップダウンリストを作る
 * @param {json} get: JSONPの値
 */
( async () =>
{
  const URL = "https://script.google.com/macros/s/AKfycbzRF1iLpeQ6McV3d6Z540yBqovDsErS_OgEeuX3EBFnZQpE_ds/exec";
  funcs.set( ids.common.wages, await fetch( URL )
    .then( ( request ) => request.text() ) );

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
  let json = JSON.parse( funcs.get( ids.common.wages ) );
  json.minumum_wages.forEach( prefecture =>
  {
    add( prefecture.prefecture_code, prefecture.prefecture_name )
    average += prefecture.wage;
  } );
  json.minumum_wages.push( { wage: parseInt( average / json.minumum_wages.length ) } )
  add( json.minumum_wages.length, "全国平均" );

  // 未選択時にバグになるため追加。value=0はロードまで表示させたい項目のためJSではなくhtmlにベタ書きしている。
  json.minumum_wages.unshift( { wage: 0 } )
} )();

function changelocation ( value )
{
  funcs.set( ids.common.view, JSON.parse( funcs.get( ids.common.wages ) ).minumum_wages[ value ].wage, true );
  __check_wage();
}

function __check_wage ()
{
  // calc.jsから実施
  let wage = funcs.get( ids.common.view );
  [
    ids.dispatch.price,
    ids.outsource.price_low,
    ids.outsource.price_high,
  ].map( ( id ) => document.getElementById( id ).style.background = ( funcs.get( id ) >= wage ) ? "white" : "pink" );
}
