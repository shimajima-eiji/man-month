/**
 * 失業保険給付日から残日数を通知する
 */
var unemployment_insurance = function() {
  const BENEFIT_STARTDATE = PropertiesService.getScriptProperties().getProperty("unemployment_start");
  const BENEFIT_SERVEDATE = PropertiesService.getScriptProperties().getProperty("unemployment_serve");
  const LINE_TOKEN = "notify_token_trash";

  var today = Snippets.Module.date();
  var enddate=Snippets.Module.date(BENEFIT_STARTDATE).add(Number(BENEFIT_SERVEDATE), 'days');  
  var remnants = enddate.diff(today,"days");

  var message = "失業給付日数: " + today.format("YYYY月M日D日") + "\n" + enddate.format("YYYY月M日D日") + "まで、あと「" + remnants + "」日";
  Snippets.Line().send( message, LINE_TOKEN );
}
