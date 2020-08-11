/**
 * 計算が狂うので、最小と最大が入れ替わったら是正する
 */
function __min_max ()
{
  let low = values.hours.outsource_min(),
    high = values.hours.outsource_max();

  if ( high < low )
  {
    funcs.set( ids.outsource.hours_long, low, true );
    funcs.set( ids.outsource.hours_short, high, true );
  }
}

/**
 * 要素を上書きする。
 * @param {string} id 書き換える要素
 * @param {string} value 書き換える値
 * @param {boolean} force 既に入力済みでも強制的に書き換える
 */
function __set ( id, value, force )
{
  if ( !funcs.get( id ) || force ) document.getElementById( id ).value = parseInt( value );
}

/**
 * NaNだと異常値が出るので、各項目を初期値に戻す
 */
function __reset ( id )
{
  funcs.set( id, funcs.get( id ), true );
  [
    [ ids.dispatch.price, values.price.min ],
    [ ids.dispatch.hours, values.hours.month ],

    [ ids.outsource.price_low, values.price.min ],
    [ ids.outsource.price_high, values.price.min ],
    [ ids.outsource.hours_short, values.hours.month ],
    [ ids.outsource.hours_long, values.hours.month ],

    [ ids.after.over, values.hours.after_min ],
    [ ids.after.late, values.hours.after_min ],
    [ ids.after.holiday, values.hours.after_min ],
    [ ids.after.holilate, values.hours.after_min ],
  ].map( ( objs ) => funcs.set( objs[ 0 ], objs[ 1 ] ) );
}

/**
 * 書き換え元を加工して書き換え後に反映する
 * 元々は金額と日付から算出しているものを対象としていた
 * @param {string} from_id 書き替え元
 * @param {string} to_id 書き換え後
 * @param {string or number} param ID or 値。ID(string)の場合はgetする
 * @param {boolean} reverse_flag 価格✕時間で月収、年収✕１２ヶ月で年になる。逆から見る場合は割れば良い
 */
function __run ( from_id, to_id, param, reverse_flag )
{
  if ( typeof ( param ) == "string" || param instanceof String ) param = funcs.get( param );

  funcs.set( to_id, ( !reverse_flag )
    ? funcs.get( from_id ) * param
    : funcs.get( from_id ) / param
    , true );
}

/**
 * 要素名
 * outsource: SES業務委託
 * dispatch: 派遣
 * after: 時間外内訳
 * common: タブに影響しないもの
 */
const ids = {
  outsource: {
    price_low: 'low',
    price_high: 'high',
    hours_short: 'short',
    hours_long: 'long',
  },
  dispatch: {
    price: 'hour',
    hours: 'hourtime',
  },
  after: {
    over: "overtime",
    late: "latetime",
    holiday: "holidaytime",
    holilate: "holilatetime",
  },
  common: {
    month: 'month',
    year: 'year',
  }
}

/**
 * idsに対応する値をリアルタイムで取れるよう関数として保持する
 * リファクタリングにより決め打ちが増えたので、修正箇所を集約する目的で作成
 * price: 金額に絡むもの。時間外については倍率を付与した時間として処理（1時間の残業は1.25時間の稼働に相当）
 * hours: 時間に絡むもの。各要素の値をそのまま受ける
 */
const values = {
  price: {
    min: 0,
    month: () => funcs.get( ids.common.month ),
    years: () => funcs.get( ids.common.year ),

    dispatch: () => funcs.get( ids.dispatch.price ),
    low: () => funcs.get( ids.outsource.price_low ),
    high: () => funcs.get( ids.outsource.price_high ),

    over: () => funcs.get( ids.after.over ) * 1.25,
    late: () => funcs.get( ids.after.late ) * 1.5,
    holiday: () => funcs.get( ids.after.holiday ) * 1.35,
    holilate: () => funcs.get( ids.after.holilate ) * 1.6,
  },
  hours: {
    after_min: 0,
    month: 160,
    years: 12,

    dispatch: () => funcs.get( ids.dispatch.hours ),
    outsource_min: () => funcs.get( ids.outsource.hours_short ),
    outsource_max: () => funcs.get( ids.outsource.hours_long ),

    over: () => funcs.get( ids.after.over ),
    late: () => funcs.get( ids.after.late ),
    holiday: () => funcs.get( ids.after.holiday ),
    holilate: () => funcs.get( ids.after.holilate ),
  },
}

/**
 * 関数名を集約管理する
 * ロジック関数内から呼ぶ場合は必ずfuncsを経由させ、他関数を作成する際は__funcnameを徹底する
 */
const funcs = {
  get: ( id ) => Number( document.getElementById( id ).value ),
  set: __set,
  run: __run,
  reset: __reset,
}

/**
 * 時給や時間を更新したら月収を最新化する
 * 派遣タブの場合、時間外内訳は初期化して再設定する。
 * 業務委託タブの場合、残業の概念はないので時間外内訳を操作しない。
 *
 * そのため、どこを変更したのかを取得する必要があるためidで分岐させる
 * @param {string} id
 */
function hour2month ( id )
{
  let dispatch_flg,
    from,
    param;


  switch ( id )
  {

    // 派遣
    default:
      dispatch_flg = true;
      [
        [ ids.after.over ],
        [ ids.after.late ],
        [ ids.after.holiday ],
        [ ids.after.holilate ],
      ].map( ( id ) => funcs.set( id, values.hours.after_min, true ) );
      __changecolor( true );

      from = ids.dispatch.price,
        param = ids.dispatch.hours;
      break;

    // 業務委託：効率的
    case ids.outsource.price_high:
      from = ids.outsource.price_high,
        param = ids.outsource.hours_short;
      break;

    // 業務委託：非効率的
    case ids.outsource.price_low:
      from = ids.outsource.price_low,
        param = ids.outsource.hours_long;
      break;
  }
  funcs.run( from, ids.common.month, param );
  if ( dispatch_flg ) business.h2o();
}

/**
 * 月収を更新したら時給を最新化する
 * 時間を更新した時にも呼ばれるので、大小を適正な位置に修正させてから計算する
 * hour2monthと違い、時給の更新は一括で行えば良い
 */
function month2hour ()
{
  __min_max();

  let hours = values.hours.dispatch();
  if ( hours > values.hours.month ) hours = values.hours.month + values.price.over() + values.price.late() + values.price.holiday() + values.price.holilate();

  funcs.run( ids.common.month, ids.dispatch.price, hours, true )
  funcs.run( ids.common.month, ids.outsource.price_low, ids.outsource.hours_long, true )
  funcs.run( ids.common.month, ids.outsource.price_high, ids.outsource.hours_short, true )
}

/**
 * 月収を更新したら年収を最新化する
 */
function month2year ()
{
  funcs.run( ids.common.month, ids.common.year, values.hours.years )
}

/**
 * 年収を更新したら月収を最新化する
 */
function year2month ()
{
  funcs.run( ids.common.year, ids.common.month, values.hours.years, true )
}

/**
 * 時給時間を更新したら時間外内訳を初期化する
 */
function hour2over ()
{
  let hours = values.hours.dispatch();
  hours = ( hours > values.hours.month ) ? hours - values.hours.month : values.hours.after_min;
  [
    ids.after.late,
    ids.after.holiday,
    ids.after.holilate,
  ].map( ( id ) => funcs.set( id, values.hours.after_min, true ) );
  funcs.set( ids.after.over, hours, true );
  business.o2m();
}

/**
 * 派遣と時間外内訳の背景を変える
 * @param {boolean} success_flag success(white) / error(red)
 */
function __changecolor ( success_flag )
{
  [
    ids.dispatch.hours,
    ids.after.over,
    ids.after.late,
    ids.after.holiday,
    ids.after.holilate,
  ].map( ( id ) => document.getElementById( id ).style.background = ( success_flag ) ? "white" : "pink" );
}

/**
 * 時間外内訳を更新したら月収を更新する
 * if: 時間外内訳の総計と派遣タブの稼働時間が不一致：赤くして終了
 * 時給✕（通常時＋時間外分を通常時に適用）で算出し月収に加算する
 *
 * 算出が複雑なので解説する
 */
function over2month ()
{
  // 派遣の全稼働時間のうち160時間を有効にし、残業時間を然る算出で時間に反映する
  let dispatch_allhours = values.hours.dispatch()
  let dispatch_overtime = ( dispatch_allhours > values.hours.month )
    ? dispatch_allhours - values.hours.month
    : 0;
  let after_overtime = values.hours.over() + values.hours.late() + values.hours.holiday() + values.hours.holilate()
  let hours_matching = dispatch_overtime == after_overtime;

  __changecolor( hours_matching );
  if ( !hours_matching ) return
  // これにより、超過時間＝残業時間と帳尻が合っている（0含む）ため、稼働時間で残業は別計算できるようになる。とても大事

  // 例：180時間
  funcs.set( ids.common.month, values.price.dispatch()
    * ( dispatch_allhours  // 180
      - dispatch_overtime  // 超過した20時間は削除。0なら以下は何もしていない
      + values.price.over() // 残業時間を当該倍率に従い再計算、以下４つ
      + values.price.late()
      + values.price.holiday()
      + values.price.holilate()
    ), true );
}

/**
 * 関数名を集約管理するが、呼び出し元が一箇所しかないようにする
 * ビジネス関数内から呼ぶ場合は
 */
const business = {
  h2m: hour2month,
  m2h: month2hour,
  m2y: month2year,
  y2m: year2month,
  h2o: hour2over,
  o2m: over2month,
};

/**
 * 計算実行部
 * @param {object} e 発火元。必要なのはIDのみ
 */
function calc ( e )
{
  funcs.reset( e.id );

  switch ( e.id )
  {

    //時間外内訳
    case ids.after.over:
    case ids.after.late:
    case ids.after.holiday:
    case ids.after.holilate:
      business.o2m();
      break;

    // 派遣・時給関連は時給＊時間から月収を算出する
    case ids.dispatch.hours:
    case ids.dispatch.price:
    case ids.outsource.price_low:
    case ids.outsource.price_high:
      business.h2m( e.id );

    // 月収・業務委託稼働時間は月収から時間などを算出する
    case ids.common.month:
    case ids.outsource.hours_short:
    case ids.outsource.hours_long:
      business.m2h();
      business.m2y();
      break;

    // 年収は時給の逆を行う
    case ids.common.year:
      business.y2m();
      business.m2h();
      break;
  }

  __check_wage();
}
