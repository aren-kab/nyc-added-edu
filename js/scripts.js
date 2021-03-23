mapboxgl.accessToken = 'pk.eyJ1IjoiYXJlbi1rYWIiLCJhIjoiY2tsMTJhejk3MHhxazJxcW5sbGo0d3R3bSJ9.iuLNkGjRTZohqeqRzq-r7g';

var map = new mapboxgl.Map({
  container: 'mapContainer', // container ID
  style: 'mapbox://styles/mapbox/light-v10', // style URL
  center: [-73.984771, 40.727157], // starting position [lng, lat]
  zoom: 11 // starting zoom
});

// disable map zoom when using scroll
// map.scrollZoom.disable();

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
var programs = ['Broad','Liberal-Arts','Arts','Niche','Health','Law'];

// Add checkbox and label elements for the layer.
programs.forEach(function(id) {
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

//Let's add the college json
$.getJSON('./data/colleges.json', function(colleges) {
    console.log(colleges)

    colleges.forEach(function(college) {
      console.log(college.name, college.address,college.url,college.institution,college.type,college.url)

      //configurepopup
      var html = `
            <div>
              <h3> <a style = "color: black;" href = ${college.url}>${college.name}</a></h3>
              <div><strong>Location:</strong> ${college.address}, ${college.zip}</div>
              <div><strong>Type:</strong> ${college.type}</div>
              <div><strong>Programs:</strong> ${college.Programs}</div>
            </div>
        `
    //color if public statement
      if (college.institution == 'Public') {
       var el = document.createElement('div');
         el.className = `marker marker-${college.type} marker-${college.Programs} `;
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
            el.className = `marker marker-${college.type} marker-${college.Programs}`;
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

//trigger show and hide by checkboxes Bachelors
document.getElementById("Bachelors").addEventListener('change', function(e) {
   if (e.target.checked === false) {
     $('.marker-Bachelors').each(function() {
       $(this).hide();
     });
   } else {
     $('.marker-Bachelors').each(function() {
       $(this).show();
     });
   }
 })

 //trigger show and hide by checkboxes Community
 document.getElementById("Community").addEventListener('change', function(e) {
    if (e.target.checked === false) {
      $('.marker-Community').each(function() {
        $(this).hide();
      });
    } else {
      $('.marker-Community').each(function() {
        $(this).show();
      });
    }
  })

  //trigger show and hide by checkboxes Graduate
  document.getElementById("Graduate").addEventListener('change', function(e) {
     if (e.target.checked === false) {
       $('.marker-Graduate').each(function() {
         $(this).hide();
       });
     } else {
       $('.marker-Graduate').each(function() {
         $(this).show();
       });
     }
   })

 //trigger show and hide by checkboxes Broad
 document.getElementById("Broad").addEventListener('change', function(e) {
    if (e.target.checked === false) {
      $('.marker-Comprehensive').each(function() {
        $(this).hide();
      });
    } else {
      $('.marker-Comprehensive').each(function() {
        $(this).show();
      });
    }
  })

  //trigger show and hide by checkboxes Liberal Arts
  document.getElementById("Liberal-Arts").addEventListener('change', function(e) {
     if (e.target.checked === false) {
       $('.marker-Liberal-Arts').each(function() {
         $(this).hide();
       });
     } else {
       $('.marker-Liberal-Arts').each(function() {
         $(this).show();
       });
     }
   })

   //trigger show and hide by checkboxes Arts
 document.getElementById("Arts").addEventListener('change', function(e) {
    if (e.target.checked === false) {
      $('.marker-Arts').each(function() {
        $(this).hide();
      });
    } else {
      $('.marker-Arts').each(function() {
        $(this).show();
      });
    }
  })

    //trigger show and hide by checkboxes Niche
  document.getElementById("Niche").addEventListener('change', function(e) {
     if (e.target.checked === false) {
       $('.marker-Niche').each(function() {
         $(this).hide();
       });
     } else {
       $('.marker-Niche').each(function() {
         $(this).show();
       });
     }
   })

     //trigger show and hide by checkboxes Health
 document.getElementById("Health").addEventListener('change', function(e) {
    if (e.target.checked === false) {
      $('.marker-Health').each(function() {
        $(this).hide();
      });
    } else {
      $('.marker-Health').each(function() {
        $(this).show();
      });
    }
  })

      //trigger show and hide by checkboxes Law
  document.getElementById("Law").addEventListener('change', function(e) {
     if (e.target.checked === false) {
       $('.marker-Law').each(function() {
         $(this).hide();
       });
     } else {
       $('.marker-Law').each(function() {
         $(this).show();
       });
     }
   })

// code checks boxes for filters when clicking reset
   $('.reset').click(function(e) {
     if(e.target.checked==false) {
     } else {
         $('.active').each(function() {
             this.checked = true
             $('marker').each(function(){
              $(this).show()
          })
        });
      }
    });

//show all markers on reset click
  $('.reset').click(function(e) {
    $('.marker').each(function() {
      $(this).show();
    });
  })

///doesn't work
 // document.getElementById('marker').click.addEventListener('change', function(e){
 //   $(e.target.checked === true)
 //   $('.marker').each(function(){
 //     $(this).show();
 //   })
 // })
