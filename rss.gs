var Rss = function(contentID)
{
  const RSS = "rss";
  var property = microCMS();
  property.get( RSS );
  const ENDPOINT = property.find("rss", contentID).value;

  //rss,xmlから読み取り
  var xml = UrlFetchApp.fetch( ENDPOINT ).getContentText();
  var document = XmlService.parse( xml );
  var entries = document.getRootElement().getChildren( "channel" )[ 0 ].getChildren( "item" );

  entries.map( function ( entry )
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