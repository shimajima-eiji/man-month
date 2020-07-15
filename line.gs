var Line = function() {
  var property = microCMS();
  property.get( "line" );
  const ENDPOINT = property.find("line", "notify_url").value;

  return {
    property: property,
    send: function(message, token) {
      if(!message) return print('LINE message: ' + message);

      const op = {
        "method" : "post",
        "payload": "message=" + message,
        "headers":{"Authorization" : "Bearer " + property.find("line", token).value}
      };
      try{
        Module.fetch(ENDPOINT, op);
      } catch(e) {
        print('LINE token: ' + token);
      }
    }
  }
}

function test() {
  var line = Line();
  line.send("test", "notify_token_news");
}