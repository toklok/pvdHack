const $ = require('jquery');
const L = require('leaflet');
const wards = require('json!./geojson.json');
const dataJSON = 'data.json';
const images = L.Icon.Default.imagePath = './images';
const markerArray = [];


$(document).ready(function () {
  let map = L.map('mapid').setView([41.8240, -71.4128], 13);
  
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  
  let addMarker = () => {
    
    for (let j = 0; j < markerArray.length; j++) {
      
     let marker = new L.marker([markerArray[j].long, markerArray[j].lat]);
      map.addLayer(marker);
    }
    
      var myStyle = {
        "fillColor": "#00B4FF",
        "weight": 1.5,
        "fillOpacity": 0.1
    };
    L.geoJson(wards,{
    style: myStyle
    }).addTo(map)
    //var providenceLayer = L.geoJson().addTo(map);
    //providenceLayer.addData(wards);

  }
function formatD(){
  let msg = "<ul>"
  for(var i = 0; i< markerArray.length; i++){
    msg = msg + "<li>" + markerArray[i].dateTime 
    msg = msg + " Location: " + markerArray[i].street 
    msg = msg + " - " + markerArray[i].type +"</li>"  
  }
  msg = msg + "</div>";
  $('.dataFloat').append(msg);
  }

  function pushData(data) {
    for (let i = 0; i < data.alerts.length; i++) {
      let d = data.alerts[i];
      if (d.type === "ROAD_CLOSED" || 1 ===1) {
        let street = (d.street !== undefined) ? d.street : "Not Available";
        let dt = new Date(d.pubMillis);
        
        markerArray.push({
          dateTime : dt,
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
     formatD();
  }
  $.getJSON( dataJSON, {
    format: "JSON"
})
  .done(function (data) {
    pushData(data);
  });
});