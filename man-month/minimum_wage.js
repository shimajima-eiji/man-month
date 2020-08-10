function getWage ()
{
  const URL = 'https://takaya1992.com/jp_minimum_wage_data/minimum_wage.json';
  var request = new XMLHttpRequest();

  request.open( 'GET', URL, true );
  request.responseType = 'json';

  request.onload = function ()
  {
    var data = this.response;
    console.log( data.minimum_wages );
  };

  request.send();
}


