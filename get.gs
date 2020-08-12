function doGet(e) {
  const PROPERTIES = PropertiesService.getScriptProperties().getProperties();
  const sheet = SpreadsheetApp.getActiveSheet();
  
  var alldata = sheet.getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn()).getValues();
  var keys = alldata.shift();
  var result = {
    wage_rate: alldata.pop()[2],
    minumum_wages: alldata.map(array2json),
  };
  
  function array2json(datas) {
    var result = {};
    for(var i=0; i<datas.length; i++) {
      result[keys[i]] = (keys[i] == PROPERTIES.date)
      ? Moment.moment(datas[i]).format(PROPERTIES.date_format)
      : datas[i];
    }
    return result;
  }

  // 戻り値作成
  return ContentService.createTextOutput(JSON.stringify(result));
}
