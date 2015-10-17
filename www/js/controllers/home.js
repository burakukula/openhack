'use strict';

// Home screen controller
angular.module('kazimir')
.controller('HomeController', function($scope, $ionicLoading, $translate, $timeout, LanguageService, ApiService) {

  // initialize default variables
  $scope.lang = LanguageService.getCurrentLanguage();
  $scope.loadingError = null;

  // define function to set language
  $scope.setLanguage = function(lang) {
    LanguageService.setLanguage(lang);
    $scope.lang = lang;
  }

  // perform initial loading
  var apiLoader = ApiService.initialize();

  $timeout(function() {
    apiLoader.then(function() {
      $ionicLoading.hide();
    }, function(err){
      $ionicLoading.hide();
      $scope.loadingError = true;
    });
  });

  // show the loading indicator
  $ionicLoading.show({
    template: $translate.instant('loading')
  });

});
