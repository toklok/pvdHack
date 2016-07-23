  var mymap = L.map('mapid').setView([41.8420, 71.4128], 13);
  var geojsonFeature = {
    "type": "Feature",
    "properties": {
        "name": "Coors Field",
        "amenity": "Baseball Stadium",
        "popupContent": "This is where the Rockies play!"
    },
    "geometry": {
        "type": "Point",
        "coordinates": [-104.99404, 39.75621]
    }
  };
  
  L.geoJson(geojsonFeature).addTo(map);
  
  var myPoints = [{
    "type": "Point",
    "coordinates": [-104.99404, 39.75621]
}, {
    "type": "Point",
    "coordinates": [-104.99404, 39.75234]
}];
