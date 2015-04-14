'use strict';

/**
 * @ngdoc function
 * @name test150327App.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the test150327App
 */
angular.module('test150327App')
  .controller('LogoutCtrl', function ($scope,$location,auth) {
  	auth.logout({
      success:function(){
  		  $location.path('/');
  	  },error:function(){
      }
    });
  });
