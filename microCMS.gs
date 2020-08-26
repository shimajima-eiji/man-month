/*
# 更新履歴:コミットログ
## [2020/07/27][ver0.1.0] trash:最適化/microCMS:呼び出しを簡素化/Module:astypeとエラーキャッチ
運用開始。使い方: https://github.com/shimajima-eiji/Hosting/wiki/[共通]-github-changesが使えないサービスのバージョン管理

# 初期設定
```
var PROPERTIES = function() {
  return PropertiesService.getScriptProperties().getProperties();
}();
```
プロジェクトのプロパティにはそれぞれ、
- SERVICE_ID
- APIKEY
- PERMISSION_CONTENTID
を設定する

# 使い方
ソースコードで解説する。
```
function howtouse ( target )
{
  var fetch = microCMS();
  fetch.get( "slack" );  // fetch.slackのjsonを追加
  fetch.get( "line" );   // fetch.lineのjsonを追加
  fetch.get( "line" );   // この時はAPIをコールしない
  fetch.line;  // いったんfetchしたものは引数で指定した名前でも呼び出せる

  fetch.get( "notExist" );   // microCMSに存在するが、propertyに登録されていないものは参照できない
}
```

短縮形のvalueで特殊な用途に対応できるラッパーが使える。

# 定数
- SERVICE_ENDPOINT: microcmsのエンドポイント
- HEADER: ヘッダ情報
- LIMIT: 一度に取得する件数
- KEYID: コンテンツのID。一律で設定されるmicroCMSの仕様
- CONTENTS: microCMSの仕様
- PROPERTY: プロパティ名

## 特殊
- [simpleValue_contentId](https://github.com/shimajima-eiji/Hosting/wiki/[microCMS][GAS]-APIスキーマ（特殊例）#api-values の値)
- ModuleFunction: Moduleを一元管理

# 関数
内向きの関数と外向きの関数が混在しており、またthis(fetched)を渡すことでパラメーターを更新しつつメソッドチェーンを実現しているため、明示的に宣言する。

## 内向き
外から呼ばれたくないもの。
外向きと混在するので、明示的にlocal配列に格納することで差別化を図る。

- write:_write       / 書き込み
- read:_read         / 読み込み
- contents:_contents / コンテンツを探して読み込み、contentsを返す
- get:_call          / APIを叩く
- fetch:_return      / 名前を後で変えそうなので、吸収用
- find:_find         / 同じような処理を使いまわしているので一元化

## 外向き
ビジネスロジックを集約したもの。そのため基本的に外から呼ぶもの。

- fetchCall   / 指定したAPI設定より結果を取得する
- find        / jsonの要素から値を引っ張り出す。
- simpleValue / fetchしてfindするのを省略したもの。API節約に特化

## 特殊
_callだけ内向きのカテゴリで外向きの配列に入れている。
これは、クライアント側でカスタムして使うことを想定しているが、使うべきではない。

# 留意点


# TODO
- https://github.com/shimajima-eiji/Hosting/issues/20

*/

var microCMS = function ()
{
  /***
  // 定数（運用）
  ***/
  const SERVICE_ENDPOINT = "https://" + PROPERTIES.SERVICE_ID + ".microcms.io/api/v1/"
  const HEADER = { headers: { "X-API-KEY": PROPERTIES.APIKEY } };
  const LIMIT = 100;
  const KEYID = "id";
  const CONTENTS = "contents";
  const PROPERTY = "property";

  /***
  // 定数（関数向け）
  ***/
  const simpleValue_contentId = "value";
  const ModuleFunction = {
    read: Module.array_read,
    find: Module.findValue_array
  }

  /***
  // 外から呼び出されない固有の関数群。fetchedを決め打ちしてよい
  ***/
  function _return ()
  {
    return fetched;
  }
  function _write ( value, key )
  {
    if ( key )
      local.fetch()[ key ] = value;
    local.fetch().result = value;
  }
  function _read ( key )
  {
    return ( ModuleFunction.read( local.fetch(), key ) )
      ? local.fetch()[ key ]
      : local.fetch().result;
  }
  function _contents ( key )
  {
    if ( ModuleFunction.read( local.read( key ), CONTENTS ) )
      return local.read( key )[ CONTENTS ]
  }
  function _call ( contentId )
  {
    var contents_endpoint = SERVICE_ENDPOINT + contentId + "?limit=" + LIMIT;

    debug( Module );
    return Module.fetch( contents_endpoint, HEADER );
  };
  function _find ( contents, value )
  {
    return local.write( ModuleFunction.find( contents, KEYID, value ) );
  }
  const local =
  {
    read: _read,
    write: _write,
    contents: _contents,
    get: _call,
    fetch: _return,
    find: _find,
  };

  /***
  // 外から呼び出せる固有の関数群。returnに入れる。指定がない限りfetchedを返す
  ***/
  function fetchCall ( target, contents )
  {
    if ( !contents ) contents = _contents( PROPERTY );

    // microCMSで設定しているコンテンツだけ配信する
    var result = local.find( contents, target );
    if ( !local.read() || local.read().length == 0 )
    {
      print( "要素が存在しません" )
      return null;
    }

    // 過去に未実施の場合だけAPIコール
    if ( !local.fetch()[ target ] )
    {
      debug( "APIコール: " + target )
      local.write( local.get( target ), target );
    }
    return local.fetch();
  };
  function find ( contentId, value )
  {
    fetchCall( contentId );
    local.find( local.contents( contentId ), value );

    if ( local.read() && local.read().length > 0 )
      return local.read()[ 0 ];
  };
  function simpleValue ( contentId, value )
  {
    var result = find( contentId, value );
    if ( ModuleFunction.read( result, simpleValue_contentId ) )
      return result[ simpleValue_contentId ];
  }

  // returnに乗せて外から呼び出せるもの
  var fetched = {
    property: local.get( PROPERTIES.PERMISSION_CONTENTID ),
    get: fetchCall,
    find: find,
    value: simpleValue
  };

  return fetched;
};