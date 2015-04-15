'use strict';

/**
 * @ngdoc function
 * @name test150327App.controller:ResetpasswordCtrl
 * @description
 * # ResetpasswordCtrl
 * Controller of the test150327App
 */
angular.module('test150327App')
  .controller('ResetpasswordCtrl', function ($scope,$location,auth) {

  	$scope.form = {};

  	$scope.resetpassword = function	resetpassword() {
  		auth.resetPassword($scope.form.email,{
  			success: function () {
  				$location.path('/login');
  				$scope.$apply();
  			},
  			error: function (error) {
  				$scope.error = error.message;
            	$scope.$apply();
  			}
  		});
  	};
    
  });
