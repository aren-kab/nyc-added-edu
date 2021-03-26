mapboxgl.accessToken = 'pk.eyJ1IjoiYXJlbi1rYWIiLCJhIjoiY2tsMTJhejk3MHhxazJxcW5sbGo0d3R3bSJ9.iuLNkGjRTZohqeqRzq-r7g';

var map = new mapboxgl.Map({
  container: 'mapContainer', // container ID
  style: 'mapbox://styles/mapbox/light-v10', // style URL
  center: [-73.924771, 40.727157], // starting position [lng, lat]
  zoom: 11,
   // starting zoom
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
map.addControl(new mapboxgl.NavigationControl());
// add attribution because it's not visible anymore
map.addControl(new mapboxgl.AttributionControl(),['top-left']);


//initiate filter
var filterGroup = document.getElementById('filter-group');

//Filter by college type
var years = ['Associate','Bachelors','Graduate'];

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

      //configurepopup use classes for css
      var html = `
            <div>
              <h3 class = "popuptitle"> <a href = ${college.url} target="_blank" rel="noopener noreferrer" class = "popuptitle">${college.name}</a></h3>
              <div><strong>Address:</strong> ${college.address}, ${college.zip} </div>
              <div><strong>Type:</strong> ${college.type}</div>
              <div><strong>Programs:</strong> ${college.Programs}</div>
            </div>
        `
    //color if public statement use classes for future filters
      if (college.institution == 'Public') {
       var el = document.createElement('div');
         el.className = `marker marker-${college.type} marker-${college.Programs} `;
         el.style.backgroundImage ='url("images/public-icon.svg")';
         el.style.width = '19.2px';
         el.style.height = '26.4px';
        //setmarker w/ anchor so they stay in place
        new mapboxgl.Marker(el,{
           anchor: "bottom",
          })
          ///set popup,use offset so that they appear uniformly
          .setPopup(new mapboxgl.Popup({anchor: 'bottom', offset:[0,-28]}).setHTML(html)) // add popup
          .setLngLat([college.lon, college.lat])
          .addTo(map);
        }
        //color if private statement use classes for future filters
        else{
            var el = document.createElement('div');
            el.className = `marker marker-${college.type} marker-${college.Programs}`;
            el.style.backgroundImage ='url("images/private-icon.svg")';
            el.style.width = '19.2px';
            el.style.height = '26.4px';
            //setmarker w/ anchor so they stay in place

          new mapboxgl.Marker(el,{
             anchor: "bottom"
            })
            ///set popup,use offset so that they appear uniformly
          .setPopup(new mapboxgl.Popup({anchor: 'bottom', offset:[0,-28]}).setHTML(html)) // add popup
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
 document.getElementById("Associate").addEventListener('change', function(e) {
    if (e.target.checked === false) {
      $('.marker-Associate').each(function() {
        $(this).hide();
      });
    } else {
      $('.marker-Associate').each(function() {
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

  var modal = document.getElementById("myModal");

  // Get about as element  to open the modal
  var btn = document.getElementById("about");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on about, open the modal
  btn.onclick = function() {
    modal.style.display = "block";
  }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  //show modal on load
  $( document).ready(function() {
    $('#myModal').show();
    // Handler for .load() called.
  });
