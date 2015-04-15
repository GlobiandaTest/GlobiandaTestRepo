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

    $scope.error = '';

  	$scope.doLogin = function () {
  		auth.login($scope.form.user,$scope.form.pass, 
  			{
  				success: function loginSuccess(user) {
  					//alert(user._sessionToken);
            //console.log('Email verification: 'user.get('emailVerified'));
            redirectUrl();
  					$scope.$apply();
  				},
  				error: function loginError(user, error) {
            $scope.error = error.message;
            $scope.$apply();
  				}
  			}
  		);
  	};

    $scope.doLoginFb = function () {
      auth.loginFb({
        successSignup: function fbSuccessSignup (user) {
          redirectUrl();
          $scope.$apply();
        },
        successLogin: function fbSuccessLogin (user) {
          redirectUrl();
          $scope.$apply();
        },
        error: function fbError (user, error) {
          $scope.error = error.message;
          $scope.$apply();
        }
      });
    };

    var redirectUrl = function () {
      if (auth.getPreviousUrl()) {
        $location.path(auth.getPreviousUrl());
        auth.clearPreviousUrl();
      } else {
        $location.path('/');
      }
    };

  });
