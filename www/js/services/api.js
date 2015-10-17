'use strict';

angular.module('kazimir')
.factory('ApiService', function(Restangular, $q, uiGmapGoogleMapApi) {

  var streets = null;

  var deferred = $q.defer();

  // perform initial request by loading streets
  // returns promise
  var initialize = function() {
    return getStreets();
  };

  // loads the streets form API
  var getStreets = function() {
    if (streets) {
      // resolve promise immediately
      deferred.resolve(streets);
    } else {

      // get the street list
      var StreetApi = Restangular.all('streets').getList();

      // get from the api
      StreetApi.then(function(streetData) {

        // cache converted result
        streets = convertPaths(streetData);
        deferred.resolve(streets);
      }, function(error) {
        deferred.reject(error);
      });
    }

    return deferred.promise;
  };

  // process streets paths to render them on maps as polyLines
  var convertPaths = function(streets) {
    // Adding path for each street to display polylines
    streets.forEach(function(street) {
      street.path = [];
      var latLangPath = street.path_string.split(';');
      latLangPath.forEach(function(value) {
        var latlng = value.split(',');
        var location = {
          latitude: latlng[0],
          longitude: latlng[1]
        };
        street.path.push(location);
      });
    });

    return streets;
  };

  // expose api
  return {
    initialize: initialize,
    getStreets: getStreets
  };

});
