'use strict';

/**
 * @ngdoc function
 * @name test150327App.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the test150327App
 */
angular.module('test150327App')
  .controller('LoginCtrl', function ($scope, auth, $location) {

    $scope.error = "";

  	$scope.doLogin = function () {
  		auth.login($scope.form.user,$scope.form.pass, 
  			{
  				success: function loginSuccess(user) {
  					//alert(user._sessionToken);
  					$location.path('/');
  					$scope.$apply();
  				},
  				error: function loginError(user, error) {
            $scope.error = error.message;
            $scope.$apply();
  				}
  			}
  		)
  	}
  });
