var $ = require('jquery');

var url = 'https://na-georss.waze.com/rtserver/web/TGeoRSS?tk=ccp_partner&ccp_partner_name=Providence&format=JSON&types=traffic,alerts,irregularities&polygon=-71.440487,41.866467;-71.374741,41.858029;-71.375427,41.828744;-71.395512,41.810450;-71.373367,41.785033;-71.405811,41.764486;-71.445465,41.786057;-71.446238,41.801095;-71.489410,41.817281;-71.440487,41.866467;-71.440487,41.866467';


$(document).ready(function () {
  

  
  $.ajax(url, {
    
    success: function (data) {
      console.log(data);
    },
  
    error: function (err) {
      console.log('oh noes');
    }
    
  })
});
