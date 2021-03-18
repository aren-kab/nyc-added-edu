mapboxgl.accessToken = 'pk.eyJ1IjoiYXJlbi1rYWIiLCJhIjoiY2tsMTJhejk3MHhxazJxcW5sbGo0d3R3bSJ9.iuLNkGjRTZohqeqRzq-r7g';

var map = new mapboxgl.Map({
  container: 'mapContainer', // container ID
  style: 'mapbox://styles/mapbox/light-v10', // style URL
  center: [-73.984771, 40.727157], // starting position [lng, lat]
  zoom: 11 // starting zoom
});

// disable map zoom when using scroll
map.scrollZoom.disable();

var geocoder = new MapboxGeocoder({ // Initialize the geocoder
  accessToken: mapboxgl.accessToken, // Set the access token
  mapboxgl: mapboxgl, // Set the mapbox-gl instance
  marker: true, // Do  use the default marker style
});

// Add the geocoder to the map
map.addControl(geocoder);
//add nav control
map.addControl(new mapboxgl.NavigationControl())

//initiate filter
var filterGroup = document.getElementById('filter-group');

//Filter by college type
var years = ['Bachelors','Community','Graduate'];

// Add checkbox and label elements for the layer.
years.forEach(function(id) {
  var input = document.createElement('input');
    input.className = 'active';
    input.type = 'checkbox';
    input.id = id;
    input.checked = true;
    filterGroup.appendChild(input);

  var label = document.createElement('label');
    label.setAttribute('for', id);
    label.textContent = id;
    filterGroup.appendChild(label);
  });

// Filter by Programs

//Let's add the college json
$.getJSON('./data/colleges.json', function(colleges) {
    console.log(colleges)

    colleges.forEach(function(college) {
      console.log(college.name, college.address,college.url,college.institution,college.type)

      //configurepopup
      var html = `
            <div>
              <h3>${college.name}</h3>
              <div><strong>Location:</strong> ${college.address}, ${college.zip}</div>
              <div><strong>Type:</strong> ${college.type}</div>
              <div><strong>Programs:</strong> ${college.Programs}</div>
              <div><a src ='${college.url}'></a></div>
            </div>
        `
    //color if public statement
        if (college.institution == 'Public') {
          var el = document.createElement('div');
            el.className = 'marker';
            el.id = college.type;
            el.style.backgroundImage ='url("images/public-icon.svg")';
            el.style.width = '19.2px';
            el.style.height = '26.4px';

        new mapboxgl.Marker(el,{
           anchor: "bottom",
          })
          .setPopup(new mapboxgl.Popup({anchor: 'bottom', offset:[0,-42] }).setHTML(html)) // add popup
          .setLngLat([college.lon, college.lat])
          .addTo(map);
        }
        else{
            var el = document.createElement('div');
              el.className = 'marker';
              el.id = 'TP:' + college.type;
              el.style.backgroundImage ='url("images/private-icon.svg")';
              el.style.width = '19.2px';
              el.style.height = '26.4px';

          new mapboxgl.Marker(el,{
             anchor: "bottom"
            })
          .setPopup(new mapboxgl.Popup({anchor: 'bottom', offset:[0,-42] }).setHTML(html)) // add popup
          .setLngLat([college.lon, college.lat])
          .addTo(map);
          }
    });
})


  document.getElementById("Bachelors").addEventListener('change', function(e) {
    if (e.target.checked === false) {
      $('*[id*=Bachelors]').each(function() {
        $(this).hide();});
    } else {
      $('*[id*=Bachelors]').each(function() {
        $(this).show();});
    }
  })

  document.getElementById("Community").addEventListener('change', function(e) {
    if (e.target.checked === false) {
      $('*[id*=Community]').each(function() {
        $(this).hide();});
    } else {
      $('*[id*=Community]').each(function() {
        $(this).show();});
    }
  })

  document.getElementById("Graduate").addEventListener('change', function(e) {
    if (e.target.checked === false) {
      $('*[id*=Graduate]').each(function() {
        $(this).prop('checked', false);
      });
    } else {
      $('*[id*=Graduate]').each(function() {
        $(this).prop('checked', true);
      });
    }
  });


// map.on('load', function () {
// // Add an image to use as a custom marker
//   map.loadImage('https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
//   function (error, image) {
//     if (error) throw error;
//   map.addImage('custom-marker', image);
//   });
// });

// //let's add colleges to the map first
// map.on('style.load', function () {
//   map.addSource('colleges', {
//    type: 'geojson',
//    data: 'data/colleges.geojson'
//   });
//
//   map.addLayer({
//     'id': 'labels',
//     'type': 'symbol',
//     'source': 'colleges',
//     'layout': {
//     'icon-image': 'custom-marker'
//     }
//   });
// });
