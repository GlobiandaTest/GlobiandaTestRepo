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
  				$scope.error = error.message;
  				$scope.$apply();
  			}
  		});
  	};

    $scope.uploadImg = function uploadImg() {
      var fileUploadControl = $('#avatar')[0];
      if (fileUploadControl.files.length > 0) {
        var file = fileUploadControl.files[0];
        auth.uploadProfileImg(file, {
          success: function (us) {
            $scope.success = "The Image has been uploaded";
            $scope.user = us;
            $scope.edit = false;
            $scope.$apply();
          },
          errorUser: function (us, error) {
            $scope.error = error.message;
            $scope.$apply();
          },
          errorFile: function (error) {
            $scope.error = "The file either could not be read, or could not be saved to Parse."
            $scope.$apply();
          }
        })
      }
    };

    // make the file select work
    $(document).on('change', '.btn-file :file', function() {
      var input = $(this),
          numFiles = input.get(0).files ? input.get(0).files.length : 1,
          label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
      input.trigger('fileselect', [numFiles, label]);
    });

  });
