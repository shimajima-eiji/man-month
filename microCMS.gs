var microCMS = function(endpoint, options) {
  if(!endpoint) endpoint = PROPERTIES.ENDPOINT;
  if(!options || !options.hasOwnProperty("headers")) options = {headers: {"X-API-KEY": PROPERTIES.APIKEY}};
  
  var result = 'http.Fetch: ' + endpoint + ' / ' + options;
  try {
    result = JSON.parse(UrlFetchApp.fetch( endpoint, options));
  } catch(e) {
    print(result);
  }

  debug(result);
  return result;
}
