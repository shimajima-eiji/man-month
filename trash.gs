var notify_trash = function ( day )
{
  const NOSEND = "なし";  // valueが必須項目のため、nullが使えない(str)
  const APIID = "home";
  const CONTENTID = "notify_token_trash";

  var property = microCMS();
  property.get( APIID );

  var content = function ( contentID )
  {
    return property.find( APIID, contentID ).value;
  };
  Line().send( ( ( day ) ? "明日は" : "今日は" ) + content( Module.date().add( day, 'days' ).lang( "en" ).format( "dddd" ).toLowerCase() ) + "の日！", CONTENTID );
}

function today ()
{
  notify_trash( 0 );
}
function tommorow ()
{
  notify_trash( 1 );
}
