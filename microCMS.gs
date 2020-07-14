var microCMS = function(contentId) {
  const ENDPOINT = PROPERTIES.ENDPOINT + contentId;
  const OPTIONS = {headers: {"X-API-KEY": PROPERTIES[contentId]}};

  debug(Module);
  return Module.fetch(ENDPOINT, OPTIONS);
}

function test() {
  Logger.log(microCMS(PROPERTIES.contentId));
}
