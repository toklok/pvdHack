import $ from 'jquery';
import L from 'leaflet';
import wards from 'json!./geojson.json';

const dataJSON = 'data.json';
const images = L.Icon.Default.imagePath = './images';
const markerArray = [];


$(document).ready(function () {
  const map = L.map('mapid').setView([41.8240, -71.4128], 13);
  
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  
  let addMarker = () => {
    
    for (let j = 0; j < markerArray.length; j++) {
      
      let marker = new L.marker([markerArray[j].long, markerArray[j].lat]);
      marker.bindPopup("<b>Hello world!</b><br />I am a popup.");
      map.addLayer(marker);
    }
    
    let providenceLayer = L.geoJson().addTo(map);
    providenceLayer.addData(wards);
  };
  
  function pushData(data) {
    for (let i = 0; i < data.alerts.length; i++) {
      let d = data.alerts[i];
      if (d.type === "ROAD_CLOSED") {
        let street = (d.street !== undefined) ? d.street : "Not Available";
        
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
  
  $('#button').on('click', function () {
    $.ajax('http://localhost:3002/test', {
      success: function (data) {
        console.log('here is the data ' + data);
      },
      error: function (err) {
        console.log('oh noes ' + err);
      }
    })
  })
});