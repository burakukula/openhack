'use strict';

angular.module('kazimir')
.controller('MapController', function($scope, $rootScope, $cordovaGeolocation, ApiService) {

  // Get the street list from API
  ApiService.getStreets().then(function(data) {
    $scope.streets = data;
  });

  $rootScope.$on('streetSelected', function(event, street) {
    $scope.selectedStreet  = street;
  });

  $scope.map = {
    center: {
      latitude: 50.0491111,
      longitude: 19.9445078
    }, zoom: 15
  };

  var mapStyles = [
      {
          "featureType": "all",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "lightness": "0"
              }
          ]
      },
      {
          "featureType": "all",
          "elementType": "labels",
          "stylers": [
              {
                  "color": "#1a5691"
              }
          ]
      },
      {
          "featureType": "all",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "color": "#ffffff"
              }
          ]
      },
      {
          "featureType": "all",
          "elementType": "labels.text.stroke",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "all",
          "elementType": "labels.icon",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "administrative",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#1a5691"
              },
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "administrative",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "color": "#1a5691"
              },
              {
                  "weight": 1.2
              }
          ]
      },
      {
          "featureType": "administrative",
          "elementType": "labels",
          "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "color": "#1a5691"
              },
              {
                  "weight": "0.7"
              }
          ]
      },
      {
          "featureType": "administrative.locality",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "lightness": "-1"
              }
          ]
      },
      {
          "featureType": "administrative.neighborhood",
          "elementType": "labels",
          "stylers": [
              {
                  "color": "#1a5691"
              }
          ]
      },
      {
          "featureType": "administrative.neighborhood",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "lightness": "0"
              },
              {
                  "saturation": "0"
              },
              {
                  "gamma": "1"
              }
          ]
      },
      {
          "featureType": "administrative.neighborhood",
          "elementType": "labels.text.stroke",
          "stylers": [
              {
                  "weight": "0.01"
              }
          ]
      },
      {
          "featureType": "administrative.land_parcel",
          "elementType": "labels",
          "stylers": [
              {
                  "color": "#1a5691"
              }
          ]
      },
      {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.stroke",
          "stylers": [
              {
                  "weight": "0.01"
              }
          ]
      },
      {
          "featureType": "landscape",
          "elementType": "geometry",
          "stylers": [
              {
                  "lightness": "0"
              },
              {
                  "color": "#f6998d"
              }
          ]
      },
      {
          "featureType": "landscape",
          "elementType": "labels",
          "stylers": [
              {
                  "color": "#1a5691"
              }
          ]
      },
      {
          "featureType": "landscape.man_made",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#af967a"
              },
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "landscape.man_made",
          "elementType": "labels",
          "stylers": [
              {
                  "color": "#1a5691"
              }
          ]
      },
      {
          "featureType": "landscape.natural",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#af967a"
              },
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "landscape.natural",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "weight": "0"
              }
          ]
      },
      {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#ffffff"
              },
              {
                  "lightness": "0"
              }
          ]
      },
      {
          "featureType": "poi",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "color": "#af967a"
              },
              {
                  "weight": "5.62"
              }
          ]
      },
      {
          "featureType": "poi",
          "elementType": "labels",
          "stylers": [
              {
                  "color": "#1a5691"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "gamma": "1"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "labels",
          "stylers": [
              {
                  "color": "#1a5691"
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#af967a"
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "color": "#af967a"
              },
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "road.highway.controlled_access",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#baa186"
              }
          ]
      },
      {
          "featureType": "road.highway.controlled_access",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "color": "#e6dacd"
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#d7ccbe"
              }
          ]
      },
      {
          "featureType": "road.local",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#d2c8bc"
              }
          ]
      },
      {
          "featureType": "transit",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#e5dacf"
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#8c7358"
              }
          ]
      }
  ];

  $scope.mapOptions = {
    scrollwheel: false,
    streetViewControl: false,
    zoomControl: false,
    mapTypeControl: false,
    styles: mapStyles
  };

  $scope.pathOptions = {
    stroke: {
      color: '#565656',
      weight: 3
    },
    selectedStroke: {
      color: '#6060FB',
      weight: 3
    }
  }

  $scope.getStroke = function(street) {
    if ($scope.selectedStreet && $scope.selectedStreet.id === street.id) {
      return $scope.pathOptions.selectedStroke;
    } else {
      return $scope.pathOptions.stroke;
    }
  };

  // initialize empty position
  $scope.userLocation = {
    id: 'user',
    coords: {
      latitude: null,
      longitude: null
    },
    options: {
      icon: '/img/user.png',
      optimized: false,
      clickable: false,
      opacity: 0.9
    },
    visible: false
  };

  // geolocation callback to adjust pin coordinates
  var onPositionUpdate = function(pos) {
    $scope.userLocation.coords.latitude = pos.coords.latitude;
    $scope.userLocation.coords.longitude = pos.coords.longitude;
    $scope.userLocation.visible = true;
  };

  // handle some errors
  var onGeolocationError = function(err) {
    console.log('Error:', err.message);
  };

  // get location
  $cordovaGeolocation.getCurrentPosition({
    timeout: 30000,
    enableHighAccuracy: false
  }).then(onPositionUpdate, onGeolocationError);

  // clear watch after scope of controller is destroyed
  // $scope.$on('$destroy', function() {
  //   if (watch) {
  //     watch.clearWatch();
  //   }
  // });

});
