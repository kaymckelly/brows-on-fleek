"use strict";

// creating variables (blank plus the default radius value)
var map;
var geocoder;
var locations;
var placeDetails;
var radius = '1609';

// drawing the initial map with the starting point of the Space Needle
function drawInitialMap() {
  locations = new google.maps.LatLng(47.6205099,-122.3514714);
  drawMap();
}

// adding event listeners to radius buttons
var buttons = document.querySelectorAll('button.distance');
for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function(e) {
    radius = e.target.value;
    drawMap();
  })
}

// create geocoder object and set default map options
function drawMap() {
  geocoder = new google.maps.Geocoder();
  map = new google.maps.Map(document.getElementById('map'), {
    center: locations,
    scrollwheel: false,
    zoom: 14
  });

  // adds marker at default location
  var marker = new google.maps.Marker({
    position: locations,
    map: map
  });

  // adds Google Places library to map, also info windows
  var service = new google.maps.places.PlacesService(map);
  placeDetails = new google.maps.InfoWindow(map);

  // this is the search request made to the Google Maps API specifying the location, the radius to search within, and the desired keyword(s)
  var searchRequest = {
    location: locations,
    radius: radius,
    keyword: 'eyebrows || spa || brows'
  };

  // roughly translates to $.ajax(options, callback) except written in the style required by Google Maps API/Google Places library
  service.nearbySearch(searchRequest, function(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      // assuming the status of Google Maps Places services is ok, a for loop  runs through the returned results and places a marker at each
      for (var i = 0; i < results.length; i++) {
        var place = results[i];

        var marker = new google.maps.Marker({
          position: place.geometry.location,
          map: map
        });
      }
    }
  });
}

// loads map once page loads
google.maps.event.addDomListener(window, 'load', drawInitialMap);

// uses function codeAddress to get text from user input, set that as the new center of the map, and place a marker at that address
function codeAddress(address) {
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location
      });
      locations = results[0].geometry.location;
      drawMap();
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

// adds a click event listener to the go button, then grabs the input from that field and uses the codeAddress function to geocode user input so can place it on the map
window.onload = function() {
  var button = document.getElementById('goToHere');

  button.addEventListener('click', function() {
    event.preventDefault();
    var address = document.getElementById('userLocation').value;
    codeAddress(address);
  });
};
