'use strict';

/**
 * @ngdoc function
 * @name test150327App.controller:NavbarCtrl
 * @description
 * # NavbarCtrl
 * Controller of the test150327App
 */
angular.module('test150327App')
  .controller('NavbarCtrl', function ($scope, auth, $location) {
    $scope.isLoggedIn = auth.isLoggedIn;
    $scope.getCurrentUser = auth.getCurrentUser;

    $scope.actUser = {};
    $scope.fbProfileUrl = "";

    $scope.$watch(function() {
    	return $scope.getCurrentUser();
    }, function() {
    	if ($scope.isLoggedIn()) {
	    	auth.getCurrentUserData({
	    		success:function(us){
	    		$scope.actUser = us;
	    		if ($scope.actUser.get('fbid')) {
	    			$scope.fbProfileUrl = 'http://graph.facebook.com/' + $scope.actUser.get('fbid') + '/picture?type=square';
	    		}
	    		$scope.$apply();
	    	}});
    	} else {
    		$scope.actUser = {};
    		$scope.fbProfileUrl = "";
    		//$scope.$apply();
    	}
    	//alert('cambio el user');
    });

    $scope.isActive = function(route) {
		return route === $location.path();
	};

  });
