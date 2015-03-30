'use strict';

/**
 * @ngdoc function
 * @name test150327App.controller:NavbarCtrl
 * @description
 * # NavbarCtrl
 * Controller of the test150327App
 */
angular.module('test150327App')
  .controller('NavbarCtrl', function ($scope, auth) {
    $scope.isLoggedIn = auth.isLoggedIn;
    $scope.getCurrentUser = auth.getCurrentUser;
  });
