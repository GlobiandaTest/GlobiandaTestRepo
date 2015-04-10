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
  	$scope.formData = {};
    
  	$scope.error = "";
  	$scope.success = "";

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
        $scope.formData = $scope.user.toJSON();
  			$scope.edit = true;
  		}
  	};

  	$scope.saveChanges = function saveChanges() {
  		auth.updateCurrentUserData($scope.formData.fullname, $scope.formData.email, $scope.formData.phone, {
  			success: function (us) {
  				console.log('Yay! The Changes has been made correctly by Parse.com! ;)');
          $scope.success = "The Changes has been applied";
          $scope.user = us;
          $scope.edit = false;
          $scope.$apply();
  			},
  			error: function (us, error) {
  				$scope.error = error;
  				$scope.$apply();
  			}
  		});
  	};

  });
