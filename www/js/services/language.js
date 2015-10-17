'use strict';

angular.module('kazimir')
.factory('LanguageService', function($window, $translate) {

  // initialize app language with default
  var initializeWithDefaultLanguage = function(defaultLanguage) {
    var language = getCurrentLanguage();

    // if language was not found, init with defaults;
    if (typeof language === 'undefined') {
      language = defaultLanguage;
    };

    // set language
    setLanguage(language);
  };

  // returns currently stored language
  var getCurrentLanguage = function() {
    return $window.localStorage['language'];
  };

  // store the language in local storage
  var setLanguage = function(language) {

    // set interface language
    $translate.use(language);

    // store it in the local storage
    $window.localStorage['language'] = language;
  }

  // expose api
  return {
    initializeWithDefaultLanguage: initializeWithDefaultLanguage,
    getCurrentLanguage: getCurrentLanguage,
    setLanguage: setLanguage
  };

});
