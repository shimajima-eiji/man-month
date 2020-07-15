var Module = function ()
{
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
        if (options == RSS) {
          result = UrlFetchApp.fetch( endpoint );
          result = XmlService.parse( result.getContentText() ).getRootElement().getChildren( "channel" )[ 0 ].getChildren( "item" )
        } else {
          result = JSON.parse(UrlFetchApp.fetch( endpoint, options ) );
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
      return array.filter( function ( object ) { return object[ key ] == value } );
    }

  }
  // ここまで

}();
