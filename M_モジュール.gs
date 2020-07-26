/*
# 更新履歴:コミットログ
## [2020/07/27][ver0.1.0] trash:最適化/microCMS:呼び出しを簡素化/Module:astypeとエラーキャッチ
運用開始。使い方: https://github.com/shimajima-eiji/Hosting/wiki/[共通]-github-changesが使えないサービスのバージョン管理

# Require
- Moment: MHMchiX6c1bwSqGM1PZiW_PxhMjh3Sh48
- Slack:  M3W5Ut3Q39AaIwLquryEPMwV62A3znfOO
*/

var Module = function ()
{
  function _astype ( obj, type )
  {
    const typeOf =
    {
      object: "Object",
      array: "Object",
      string: "String",
      number: "Number",
    };
    function _istype ( obj )
    {
      return Object.prototype.toString.call( obj ).slice( 8, -1 );
    }

    if ( !typeOf.hasOwnProperty( type ) )
    {
      print( "[_astype] 判別できないオブジェクトタイプです。: " + type );
      return false;
    }
    Logger.log( typeOf[ type ] );
    print( _istype( obj ) )

    return typeOf[ type ] == _istype( obj );
  }
  function _astypes ( objs, types )
  {
    if ( !( _astype( objs, "array" ) && _astype( types, "array" ) )
      && objs.length == types.length
    )
    {
      print( "[_astypes] \nオブジェクトが不正です。また、要素数が等しい必要があります。" );
      print( "\nobjs: " + objs );
      print( "\ntypes: " + types );
      return;
    }
    //for(var i = 0obj)
  }
  const RSS = "rss";

  return {

    // ここから
    fetch: function ( endpoint, options )
    {
      if ( !endpoint )
      {
        debug( "[Fetch]: 引数が不正" );
        return null;
      }

      var result = null;
      try
      {
        if ( options == RSS )
        {
          result = UrlFetchApp.fetch( endpoint );
          result = XmlService.parse( result.getContentText() ).getRootElement().getChildren( "channel" )[ 0 ].getChildren( "item" )
        } else
        {
          result = JSON.parse( UrlFetchApp.fetch( endpoint, options ) );
        }
      } catch ( e )
      {
        print( 'http.Fetch: ' + endpoint + ' / ' + options );
      }

      debug( result );
      return result;
    },
    findValue_array: function ( array, key, value )
    {
      if ( array && key && value )
        return array.filter( function ( object ) { return object[ key ] == value } );
    },
    date: function ( day )
    {
      Moment.moment.lang( 'ja', { weekdays: [ "日", "月", "火", "水", "木", "金", "土" ], weekdaysShort: [ "日", "月", "火", "水", "木", "金", "土" ], } );
      return ( day ) ? Moment.moment( day ) : Moment.moment();
    },
    array_read: function ( array, key )
    {
      if ( array && key )
        if ( array.hasOwnProperty( key ) && array[ key ] != undefined ) return array[ key ];
    }

    // ここまで
  };

}();

