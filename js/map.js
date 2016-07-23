foo = function () {
    console.log('map');
    var mymap = L.map('mapid').setView([51.505, -0.09], 13);
  
     L.tileLayer('https://{s}.tiles.mapbox.com/v3/examples.map-i86knfo3/{z}/{x}/{y}.png').addTo(mymap)
};
