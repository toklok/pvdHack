var $ = require('jquery'),
L = require('leaflet'),
wards = require('json!./geojson.json');

var dataJSON = 'data.json';

var markerArray = [];

L.Icon.Default.imagePath = './images';

$(document).ready(function () {
  var map = L.map('mapid').setView([41.8240, -71.4128], 12);
  
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  
  addMarker = function () {
    
    for (var j = 0; j < markerArray.length; j++) {
      
      marker = new L.marker([markerArray[j].long, markerArray[j].lat])
      .addTo(map);
    }
    
    var providenceLayer = L.geoJson().addTo(map);
    providenceLayer.addData(wards);
  };
  
  function pushData(data) {
    for (var i = 0; i < data.alerts.length; i++) {
      var d = data.alerts[i];
      if (d.type === "ROAD_CLOSED") {
        var street = (d.street !== undefined) ? d.street : "Not Available";
        
        markerArray.push({
          lat: d.location.x,
          long: d.location.y,
          street: street,
          subtype: d.subtype,
          type: d.type,
          reliability: d.reliability
        });
      }
      addMarker();
    }
  }
  
  $.ajax(dataJSON, {
    success: function (data) {
      pushData(data);
    },
    error: function (err) {
      console.log('oh noes');
    }
  });
});