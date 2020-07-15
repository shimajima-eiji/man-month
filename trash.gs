function notify_trash(day) {
  const NOSEND = "なし";  // valueが必須項目のため、nullが使えない(str)
  const APIID = "home";
  const CONTENTID = "notify_token_trash";

  var property = microCMS();
  property.get( APIID );

  var content = function(contentID) {
    return property.find(APIID, contentID).value;
  };
  day = Module.date().add(day, 'days');

  var line = Line();
  line.send(content(day.lang("en").format("dddd").toLowerCase()), CONTENTID);
}

function today() {
  notify_trash(0);
}
function tommorow() {
  notify_trash(1);
}