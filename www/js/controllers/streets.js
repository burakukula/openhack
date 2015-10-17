'use strict';

angular.module('kazimir')

.controller('StreetsController', function($scope, $rootScope, $state, $ionicHistory, ApiService, $ionicViewSwitcher, $ionicScrollDelegate, $timeout, LanguageService) {


  // initialize restangular resource/model
  ApiService.getStreets().then(function(data) {
    $scope.streets = data;
  });


  // on click go to past single view
  $scope.singlePostOld = function($index) {
    $ionicViewSwitcher.nextDirection('back');
    $rootScope.street = $index;
    $rootScope.buttonClass = "new";
    $rootScope.headerClass = "old";
    $rootScope.activeView = "old";
    $state.go('single-old');
  };

  //on click go to present single view
  $scope.singlePostNew = function($index) {
    $rootScope.street = $index;
    $rootScope.buttonClass = "old";
    $rootScope.headerClass = "new";
    $rootScope.activeView = "new";
    $state.go('single-new');
  };

  var delegate = $ionicScrollDelegate.$getByHandle('singleScrollTop');
  $scope.rotate = function() {
    var container = document.getElementsByClassName('container');
    container = angular.element(container);
    container.toggleClass('flipped');
    $rootScope.activeView = "";
    if ($rootScope.headerClass === "new") {
      $rootScope.buttonClass = "new";
      $rootScope.headerClass = "old";
      $timeout(function(){
        $rootScope.activeView = "old";
      }, 800);
      $ionicScrollDelegate.scrollTop();
    }else {
      $rootScope.buttonClass = "old";
      $rootScope.headerClass = "new";
      $timeout(function(){
        $rootScope.activeView = "new"
      }, 800);
      $ionicScrollDelegate.scrollTop();
    }
  };

  $scope.lang = LanguageService.getCurrentLanguage();

  $scope.myGoBack = function() {
    $ionicHistory.goBack();
  };

  $scope.myGoBackForward = function() {
    $ionicViewSwitcher.nextDirection('forward');
    $ionicHistory.goBack();
  };
});
