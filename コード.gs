/**
 * @why range関数がないし、スプレッド構文やArray.formが使えないので自作
 * @params:
 *    * end(Number): 範囲
 *      start(Number): あれば値を、なければ0
 * @return array(Number)
 */
function range(end, start) {
  end = parseInt(end);
  if(!end == undefined && end < 0) return;
  
  start = (!start == undefined && parseInt(start) < 0) ? parseInt(start) : 0;
  var result = [];  
  for ( var i = start; i < end; i++ ) { result.push( i ); }
  return result;
}
