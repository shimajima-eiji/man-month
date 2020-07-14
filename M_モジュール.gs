var Module = function ()
{
  return {

    // ここから
    fetch: function ( endpoint, options )
    {
      if ( !endpoint || !options )
      {
        debug( "[Fetch]: 引数が不正" );
        return null;
      }

      var result = 'http.Fetch: ' + endpoint + ' / ' + options;
      try
      {
        result = JSON.parse( UrlFetchApp.fetch( endpoint, options ) );
      } catch ( e )
      {
        print( result );
      }

      debug( result );
      return result;
    },
    // ここまで

  };
}();
