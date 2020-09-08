/**
 * @use: ライブラリ読み込みをしている全てのスクリプト
 * @params:
 *   SS_Key(string): X部分: https://docs.google.com/spreadsheets/d/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
 *   sheet_name(string): シート名
 * @return(functions): sheetなど外から変更されるとまずいものを隠蔽している
 */
var SpreadSheet = function ( SS_Key, sheet_name )
{
  if ( !SS_Key ) return;

  const SS = SpreadsheetApp.openById( SS_Key );
  var sheet,
    data = [],  // set_sheetで初期化されなかった場合にエラーになる
    length = 0,  // set_sheetで初期化されなかった場合にエラーになる
    sheetdata,
    result;
  /**
   * @why: 作業中に同一ブック内のシートを変更する事を想定。改めて作り直しても良いが選択肢は多いほうが良い。
   * @params:
   *   sheet_name(string);
   * @return: null
   */
  function set_sheet ( sheet_name )
  {
    if ( sheet_name )
    {
      sheet = SS.getSheetByName( sheet_name );
      data = [];
      length = 0;
      sheetdata = undefined;
      result = undefined;
    }
  }

  set_sheet( sheet_name );

  /**
   * @why スプレッドシートにデータを投入する時に、現在の値が必ずしも必要ではないため別処理
   * @params
   *   data_flag(boolean): trueでシートデータを引き継ぐ（上書き）。falseで格納だけする
   * @return this: 参照する場合はpreview.data
   */
  function get ( data_flag )
  {
    if ( !sheet ) return this;

    if ( !sheetdata )
    {
      var row = sheet.getLastRow();
      var col = sheet.getLastColumn();
      sheetdata = ( row == 0 || col == 0 ) ? [] : sheet.getRange( 1, 1, row, col ).getValues()
    }
    if ( data_flag ) data = sheetdata;
    return this;
  }
  /**
   * @why データの格納を行う。データ整理は呼び出し元で行い、順次addで追記していく
   * @return this
   */
  function set ()
  {
    if ( !sheet ) return this;

    sheet.getRange( 1, 1, data.length, length ).setValues( data );
    sheetdata = data;
    return this;
  }

  /**
   * @why データを追加する。
   * @params
   *    array(array):
   * @return this: 実行結果はpreview.result
   */
  function add ( array )
  {
    // まず配列でない場合は処理をしない
    // lengthが初期化されていない場合は初期化する
    // ただし、arrayの要素がなかったり、最初の配列要素数と不一致の場合は処理をしない
    if ( !Array.isArray( array ) ) { result = false; return this };
    if ( length == 0 ) length = array.length;
    if ( array.length != length || length == 0 ) { result = false; return this };

    data.push( array );
    result = true;
    return this;
  }
  /**
   * @why スプレッドシートの値を取り出したい場合は`SpreadSheet(SS_Key,sheet_name).get().preview().sheetdata`
   * @return(object)
   */
  function preview ()
  {
    return {
      length: length,
      sheetdata: ( sheetdata ) ? sheetdata : "[HELP] get()を使用してスプレッドシートにアクセスできます",
      data: ( data.length ) ? data : "[HELP] add(array)を使用してデータを追記できます",
      result: ( result == undefined ) ? result : "[HELP] 直前のadd(array)の成否判定ができます",
    };
  }

  return {
    sheet: set_sheet,
    set: set,
    get: get,
    add: add,
    preview: preview,
  };
}
