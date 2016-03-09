"use strict";
var map;
var geocoder;

// create geocoder object, set default location (Space Needle), set default map options
function drawMap() {
  geocoder = new google.maps.Geocoder();
  var location = new google.maps.LatLng(47.6205099,-122.3514714);
  map = new google.maps.Map(document.getElementById('map'), {
    center: location,
    zoom: 13
  });
}

// loads map once page loads
google.maps.event.addDomListener(window, 'load', drawMap);
