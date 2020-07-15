var Rss = function(contentID)
{
  const RSS = "rss";
  var property = microCMS();
  property.get( RSS );
  const ENDPOINT = property.find(RSS, contentID).value;

  Module.fetch( ENDPOINT, RSS ).map( function ( entry )
  {
    var title = entry.getChildText( "title" );
    var link = entry.getChildText( "link" );
    var pubDate = entry.getChildText( "pubDate" );
    Logger.log( title );
    Logger.log( link );
    Logger.log( pubDate );
  } )
}

function test() {
  Rss("note");
}