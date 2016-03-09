"use strict";

// creating blank variables to later hold geocoder and map
var map;
var geocoder;

function drawMap() {
  // create geocoder object, set default location (Space Needle), set default map options
  geocoder = new google.maps.Geocoder();
  var location = new google.maps.LatLng(47.6205099,-122.3514714);
  map = new google.maps.Map(document.getElementById('map'), {
    center: location,
    zoom: 13
  });

  // adds marker at location
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });

  // adds Google Places library to map(?)
  var service = new google.maps.places.PlacesService(map);

// this is the search request made to the Google Maps API specifying the location, the radius to search within, and the desired keyword
  var searchRequest = {
    location: location,
    radius: '1609',
    keyword: 'eyebrows'
  };

  // roughly translates to $.ajax(options, callback) except in the Google Maps API/Google Places library
  service.nearbySearch(searchRequest, function(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      // assuming the status of Google Maps Places services is ok, a for loop will run through the returned results and place a marker at each
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
google.maps.event.addDomListener(window, 'load', drawMap);

// uses function codeAddress to get text from input and set that as the new center of the map and places a marker at that address
function codeAddress(address) {
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location
      });
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
