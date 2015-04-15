'use strict';

//load config
var config=$.parseJSON($.ajax({url: "config/global.json", dataType: 'json', async: false}).responseText);

Parse.initialize(config.parse.applicationId,config.parse.javaScriptKey);

window.fbAsyncInit = function() {
  Parse.FacebookUtils.init({ // this line replaces FB.init({
    appId      : config.facebook.appId, // Facebook App ID
    status     : true,  // check Facebook Login status
    cookie     : true,  // enable cookies to allow Parse to access the session
    xfbml      : true,  // initialize Facebook social plugins on the page
    version    : 'v2.3' // point to the latest Facebook Graph API version
  });
  // Run code after the Facebook SDK is loaded.
};
 
(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

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
        controller: 'LoginCtrl',
        access: 'guest',
      })
      .when('/logout', {
        templateUrl: 'views/logout.html',
        controller: 'LogoutCtrl',
        access: 'user',
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl',
        access: 'guest',
      })
      .when('/protected', {
        templateUrl: 'views/protected.html',
        controller: 'ProtectedCtrl',
        access: 'user',
      })
      .when('/restricted', {
        templateUrl: 'views/protected.html',
        controller: 'ProtectedCtrl',
        access: ['admin','seller'],
      })
      .when('/resetpassword', {
        templateUrl: 'views/resetpassword.html',
        controller: 'ResetpasswordCtrl',
        access: 'guest',
      })
      .when('/relacion', {
        templateUrl: 'views/relacion.html',
        controller: 'RelacionCtrl',
        access: 'user'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function ($rootScope, $location, auth) {
    $rootScope.$on("$routeChangeStart", function (event, next, current) {
      //check roles
      if(next.access){
        if(!auth.hasAccess(next.access)){
          auth.setPreviousUrl(next.$$route.originalPath);
          var defaultRoute=next.defaultRoute;
          if(!defaultRoute)
            defaultRoute=auth.isLoggedIn() ? '/' : '/login';
          $location.path(defaultRoute);
        }
      }
    })
  });
