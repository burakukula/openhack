// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

var KazimirApp = angular.module('kazimir',
  ['ionic', 'uiGmapgoogle-maps', 'restangular', 'pascalprecht.translate', 'ngCordova']);

// configure routes / states
KazimirApp.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('menu', {
    url: '/menu',
    views: {
      'container-view': {
        templateUrl: 'templates/menu.html',
        controller: 'HomeController'
      }
    }
  })

  .state('list-view', {
    url: '/list-view',
    views: {
      'container-view': {
        templateUrl: 'templates/list-view.html',
        controller: 'StreetsController'
      }
    }
  })

  .state('map-view', {
    url: '/map-view',
    views: {
      'container-view': {
        templateUrl: 'templates/map-view.html',
        controller: 'MapController'
      }
    }
  })

  .state('single-old', {
    url: '/streets/:id',
    views: {
      'container-view': {
        templateUrl: 'templates/single-old.html',
        controller: 'StreetsController'
      }
    }
  })

  .state('single-new', {
    url: '/streets/:id',
    views: {
      'container-view': {
        templateUrl: 'templates/single-new.html',
        controller: 'StreetsController'
      }
    }
  })

  $urlRouterProvider.otherwise('/menu');
});

// Setup Google Maps integration
KazimirApp.config(function(uiGmapGoogleMapApiProvider){
  uiGmapGoogleMapApiProvider.configure({
    libraries: 'geometry',
    v: '3.17'
  })
});

// Setup Restangular to connect to API resources
KazimirApp.config(function(RestangularProvider) {
  // For production API should point to main server ->
  RestangularProvider.setBaseUrl('http://kazimirapp.pl');

  // See: http://blog.ionic.io/handling-cors-issues-in-ionic/
  // For development we'll run through proxy /api -> http://kazimirapp.pl because of CORS
  // Uncomment line below for development on local browser
  // RestangularProvider.setBaseUrl('/api');

  // always request JSON format
  RestangularProvider.setRequestSuffix('.json');
})

KazimirApp.config(function($translateProvider) {

  $translateProvider.translations('pl', {
    sub_title: "Przewodnik o dwóch kulturach na Kazimierzu",
    choose_street: "Wybierz ulicę",
    nav_right: "Idź w prawo",
    nav_left: "Nawiguj w lewo",
    discover_past: "by odkrywać przeszłość",
    discover_present: "i zobacz jak jest teraz",
    language: "Wybierz język: ",
    discover_button: "Odkrywaj",
    loading: 'Wczytywanie danych...',
    loading_error: "Problem z wczytaniem danych :-("
  });

  $translateProvider.translations('en', {
    sub_title: "A guide and a tale of two cultures on Kazimierz",
    choose_street: "Choose street",
    nav_right: "Navigate right",
    nav_left: "Navigate left",
    discover_past: "to discover past time",
    discover_present: "to enjoy present time",
    language: "Choose language: ",
    discover_button: "Discover",
    loading: 'Loading data...',
    loading_error: "Problem z with loading data :-("
  });

  $translateProvider.preferredLanguage("pl");
  $translateProvider.fallbackLanguage("en");
});

// Initialize the app
KazimirApp.run(function($ionicPlatform, LanguageService) {

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }

    if (window.StatusBar) {
      StatusBar.styleDefault();
    }

    // try to restore language and set it
    LanguageService.initializeWithDefaultLanguage('pl');

  });
});
