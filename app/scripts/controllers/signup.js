'use strict';

/**
 * @ngdoc function
 * @name test150327App.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the test150327App
 */
angular.module('test150327App')
  .controller('SignupCtrl', function ($scope, auth, $location) {

  	$scope.error = "";

  	$scope.doSignUp = function () {
  		auth.signUp($scope.form.user, $scope.form.pass, $scope.form.email, {
  			success: function signUpSuccess(user) {
  				$location.path('/');
  				$scope.$apply();
  			},
  			error: function signUpError(user, error) {
  				$scope.error = error.message;
            	$scope.$apply();
  			}
  		});
  	}

  });
