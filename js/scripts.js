mapboxgl.accessToken = 'pk.eyJ1IjoiYXJlbi1rYWIiLCJhIjoiY2tsMTJhejk3MHhxazJxcW5sbGo0d3R3bSJ9.iuLNkGjRTZohqeqRzq-r7g';

var map = new mapboxgl.Map({
  container: 'mapContainer', // container ID
  style: 'mapbox://styles/mapbox/light-v10', // style URL
  center: [-73.984771, 40.727157], // starting position [lng, lat]
  zoom: 11 // starting zoom
});

var geocoder = new MapboxGeocoder({ // Initialize the geocoder
  accessToken: mapboxgl.accessToken, // Set the access token
  mapboxgl: mapboxgl, // Set the mapbox-gl instance
  marker: true, // Do  use the default marker style
});

// Add the geocoder to the map
map.addControl(geocoder);
//add nav control
map.addControl(new mapboxgl.NavigationControl())

map.on('load', function () {
// Add an image to use as a custom marker
  map.loadImage('https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
  function (error, image) {
    if (error) throw error;
  map.addImage('custom-marker', image);
  });
});

//let's add colleges to the map first
map.on('style.load', function () {
  map.addSource('colleges', {
   type: 'geojson',
   data: 'data/colleges.geojson'
  });

  map.addLayer({
    'id': 'labels',
    'type': 'symbol',
    'source': 'colleges',
    'layout': {
    'icon-image': 'custom-marker'
    }
  });
});
