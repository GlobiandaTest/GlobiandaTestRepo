'use strict';

/**
 * @ngdoc function
 * @name test150327App.controller:ProtectedCtrl
 * @description
 * # ProtectedCtrl
 * Controller of the test150327App
 */
angular.module('test150327App')
  .controller('ProtectedCtrl', function ($scope, auth) {
  	
  	$scope.user = {};

  	$scope.edit = false;

  	auth.getCurrentUserData({
  		success: function (user) {
  			$scope.user = user;
  			$scope.$apply();
  		}
  	});

  	$scope.toggleEdit = function toggleEdit() {
  		if ($scope.edit) {
  			$scope.edit = false;
  		} else {
  			$scope.edit = true;
  		}
  	};

  });
