"use strict";
var geocoder;
var map;

function initialize() {
  geocoder = new google.maps.Geocoder();
  var location = new google.maps.LatLng(47.5989543,-122.3359956);
  // note that the latitude/longitude must be specific (i.e. the Seattle WA lat/long doesn't work but the specific address of Galvanize does)

  map = new google.maps.Map(document.getElementById('map'), {
    center: location,
    zoom: 13
  });

  var service = new google.maps.places.PlacesService(map);

  var searchRequest = {
    location: location,
    radius: '1609',
    // types: ['beauty_salon'],
    keyword: 'eyebrows'
  };

  // this just roughly translates to $.ajax(options, callback) except in the Google Maps API/Google Places library
  service.nearbySearch(searchRequest, function(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        var place = results[i];

        var marker = new google.maps.Marker({
          position: place.geometry.location,
          map: map,
          title: 'Hello World!'
        });
      }
    }
  });
}

google.maps.event.addDomListener(window, 'load', initialize);
