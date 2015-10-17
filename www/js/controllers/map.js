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

  $scope.mapOptions = {
    scrollwheel: false,
    streetViewControl: false,
    zoomControl: false,
    mapTypeControl: false
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
