const element = document.MyInput.clickMoji;
const SoftKeyboard = () =>
{
    // 入力できる文字をテーブルで表示させるための入力配列
    const input_table = [
        [ "１", "２", "３", "４", "５", "６", "７", "８", "９", "０" ],
        [ "わ", "ら", "や", "ま", "は", "な", "た", "さ", "か", "あ" ],
        [ "を", "り", "ゆ", "み", "ひ", "に", "ち", "し", "き", "い" ],
        [ "ん", "る", "よ", "む", "ふ", "ぬ", "つ", "す", "く", "う" ],
        [ "ー", "れ", "゛", "め", "へ", "ね", "て", "せ", "け", "え" ],
        [ "　", "ろ", "゜", "も", "ほ", "の", "と", "そ", "こ", "お" ],
        [ "ぁ", "ぃ", "ぅ", "ぇ", "ぉ", "ゃ", "ゅ", "ょ", "ゎ", "っ" ]
    ];
    // 生成するHTMLタグ
    const create_tags = {
        tr: "tr",
        th: "th",
        a: "a",
    }
    // タグに設定するIDまたはクラス
    const id_class = {
        num: 'SoftkeyNum',
        chr: 'SoftkeyChr',
        erase: 'SoftkeyErs',
        point: 'Point',
    };
    // テーブルの行に設定するクラス名。テーブルの行数と同じ数になる
    const class_names = [
        id_class.num,
        id_class.chr,
        id_class.chr,
        id_class.chr,
        id_class.chr,
        id_class.chr,
        id_class.num,
    ];
    // 特定の文字を入力（クリック）した場合の処理
    const column_pattern = {
        "゛": () => SoftPoint(),
        "゜": () => SoftRound(),
        "ー": () => SoftInput( "ー" ),
        "　": () => SoftInput( "　" ),
    };
    // 負荷軽減のため、特殊な入力キーを配列で取得する
    const column_keys = Object.keys( column_pattern );
    // 作成したいタグの親要素
    const tableObject = document.getElementById( id_class.erase );
    // ループ内で使用するオブジェクトを宣言しておく
    let trObject = null;
    let thObject = null;
    let aObject = null;
    input_table.forEach( ( row, row_index ) =>
    {
        // trタグを生成し、クラス名をつける
        trObject = document.createElement( create_tags.tr );
        trObject.className = class_names[ row_index ];
        row.forEach( ( column ) =>
        {
            // aタグを生成し、テキストとhref、onclickの関数を設定する
            aObject = document.createElement( create_tags.a );
            aObject.textContent = column;
            aObject.href = "#";
            aObject.onclick = () => SoftInput( column );
            // thタグを生成する
            thObject = document.createElement( create_tags.th );
            if ( column_keys.indexOf( column ) > -1 )
            {
                // 入力値が[゛, ゜, ー, "　" ]だったら、thタグとaタグにクラス名をつけて指定したonclick関数を登録する
                thObject.className = id_class.point;
                aObject.className = id_class.point;
                aObject.onclick = column_pattern[ column ];
            }
            // 作ったaタグをthタグに入れ、thタグをtrタグに追加する
            thObject.appendChild( aObject );
            trObject.appendChild( thObject );
        } );
        // 作ったtrタグをtableタグに追加する
        tableObject.appendChild( trObject );
    } );
    // inputタグをフォーカスして初期設定を完了
    element.focus();
}
// 外から呼ばれたくないので、__をつけて何となくprivate宣言（意味がないので外から呼べてしまう）
const __execute = ( value ) =>
{
    element.value = value;
    element.focus();
}
const SoftClear = () => __execute( "" );
const SoftErase = () => __execute( element.value.slice( 0, -1 ) );
const SoftInput = ( moji ) => __execute( element.value + moji );
const SoftPoint = () =>
{
    const from_table = [
        "か", "き", "く", "け", "こ",
        "さ", "し", "す", "せ", "そ",
        "た", "ち", "つ", "て", "と",
        "は", "ひ", "ふ", "へ", "ほ",
        "が", "ぎ", "ぐ", "げ", "ご",
        "ざ", "じ", "ず", "ぜ", "ぞ",
        "だ", "ぢ", "づ", "で", "ど",
        "ば", "び", "ぶ", "べ", "ぼ",
        "ぱ", "ぴ", "ぷ", "ぺ", "ぽ",
    ];
    const to_table = [
        "が", "ぎ", "ぐ", "げ", "ご",
        "ざ", "じ", "ず", "ぜ", "ぞ",
        "だ", "ぢ", "づ", "で", "ど",
        "ば", "び", "ぶ", "べ", "ぼ",
        "か", "き", "く", "け", "こ",
        "さ", "し", "す", "せ", "そ",
        "た", "ち", "つ", "て", "と",
        "は", "ひ", "ふ", "へ", "ほ",
        "ば", "び", "ぶ", "べ", "ぼ",
    ];
    SoftChange( from_table, to_table );
}
const SoftRound = () =>
{
    const from_table = [
        "は", "ひ", "ふ", "へ", "ほ",
        "ば", "び", "ぶ", "べ", "ぼ",
        "ぱ", "ぴ", "ぷ", "ぺ", "ぽ"
    ];
    const to_table = [
        "ぱ", "ぴ", "ぷ", "ぺ", "ぽ",
        "ぱ", "ぴ", "ぷ", "ぺ", "ぽ",
        "は", "ひ", "ふ", "へ", "ほ"
    ];
    SoftChange( from_table, to_table );
}
/**
 *
 * @param {*} from_table
 * @param {*} to_table
 * @returns
 */
const SoftChange = ( from_table, to_table ) =>
{
    // from_tableとto_tableの要素数が同じでなければならない
    if ( from_table.length != to_table.length ) return element.focus();
    const VALUE = element.value;
    const LENGTH = VALUE.length;
    // 入力値がないのに濁点・半濁点だけ入力された場合は何もしない
    if ( LENGTH == 0 ) return element.focus();
    const CHAR = VALUE.charAt( LENGTH - 1 );
    // to_tableのforEachでもよい。回した数を知りたい
    from_table.forEach( ( column_from, point ) =>
    {
        // fromのカラムと最後の文字が違ったら処理をしない
        if ( column_from != CHAR ) return;
        // 最後の文字を消して、濁点・半濁点の文字を追加する
        SoftErase();
        SoftInput( to_table[ point ] );
    } );
    element.focus();
}
