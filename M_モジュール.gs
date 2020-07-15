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

      var result = null;
      try
      {
        result = JSON.parse( UrlFetchApp.fetch( endpoint, options ) );
      } catch ( e )
      {
        print( 'http.Fetch: ' + endpoint + ' / ' + options );
      }

      debug( result );
      return result;
    },
    findValue_array: function(array, key, value) {
      return array.filter( function(object) {return object[key] == value} );
    }
    // ここまで

  };
}();
