'use strict';

Parse.initialize("VdnHbNNGjRWrRzYIdOlndzSBppkrOt3bySgdDfaB", "CkGzTIsk7Eh6CFFsu5Ur31OSE14dEXcGSRAKbmjs");

/**
 * @ngdoc overview
 * @name test150327App
 * @description
 * # test150327App
 *
 * Main module of the application.
 */
angular
  .module('test150327App', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/logout', {
        templateUrl: 'views/logout.html',
        controller: 'LogoutCtrl'
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
