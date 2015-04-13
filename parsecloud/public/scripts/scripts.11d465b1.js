"use strict";Parse.initialize("VdnHbNNGjRWrRzYIdOlndzSBppkrOt3bySgdDfaB","CkGzTIsk7Eh6CFFsu5Ur31OSE14dEXcGSRAKbmjs"),window.fbAsyncInit=function(){Parse.FacebookUtils.init({appId:"1415345535439091",status:!0,cookie:!0,xfbml:!0,version:"v2.3"})},function(a,b,c){var d,e=a.getElementsByTagName(b)[0];a.getElementById(c)||(d=a.createElement(b),d.id=c,d.src="//connect.facebook.net/en_US/sdk.js",e.parentNode.insertBefore(d,e))}(document,"script","facebook-jssdk"),angular.module("test150327App",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).when("/login",{templateUrl:"views/login.html",controller:"LoginCtrl",access:{needLogin:!1}}).when("/logout",{templateUrl:"views/logout.html",controller:"LogoutCtrl"}).when("/signup",{templateUrl:"views/signup.html",controller:"SignupCtrl",access:{needLogin:!1}}).when("/protected",{templateUrl:"views/protected.html",controller:"ProtectedCtrl",access:{needLogin:!0}}).when("/resetpassword",{templateUrl:"views/resetpassword.html",controller:"ResetpasswordCtrl",access:{needLogin:!1}}).otherwise({redirectTo:"/"})}]).run(["$rootScope","$location","auth",function(a,b,c){a.$on("$routeChangeStart",function(a,d){d.access&&!c.isLoggedIn()&&d.access.needLogin&&(c.setPreviousUrl(d.$$route.originalPath),b.path("/login")),d.access&&c.isLoggedIn()&&!d.access.needLogin&&b.path("/")})}]),angular.module("test150327App").controller("MainCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("test150327App").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("test150327App").controller("LoginCtrl",["$scope","auth","$location",function(a,b,c){a.error="",a.doLogin=function(){b.login(a.form.user,a.form.pass,{success:function(){d(),a.$apply()},error:function(b,c){a.error=c.message,a.$apply()}})},a.doLoginFb=function(){b.loginFb({successSignup:function(){d(),a.$apply()},successLogin:function(){d(),a.$apply()},error:function(b,c){a.error=c.message,a.$apply()}})};var d=function(){b.getPreviousUrl()?(c.path(b.getPreviousUrl()),b.clearPreviousUrl()):c.path("/")}}]),angular.module("test150327App").factory("auth",function(){var a,b=Parse.User.current();return{login:function(a,c,d){Parse.User.logIn(a,c,{success:function(a){b=Parse.User.current(),d.success&&d.success(a)},error:function(a,b){d.error&&d.error(a,b)}})},signUp:function(a,c,d,e,f){var g=new Parse.User;g.set("username",a),g.set("password",c),g.set("email",d),g.set("fullname",e),g.signUp(null,{success:function(a){b=Parse.User.current(),f.success&&f.success(a)},error:function(a,b){f.error&&f.error(a,b)}})},logout:function(a){Parse.User.logOut().then(function(){b=Parse.User.current(),a()})},loginFb:function(a){Parse.FacebookUtils.logIn("email",{success:function(c){c.existed()?(console.log("User logged in through Facebook!"),b=Parse.User.current(),a&&a.successLogin&&a.successLogin(c)):(console.log("User signed up and logged in through Facebook!"),FB.api("/me",function(d){console.log(d),c.set("fullname",d.name),c.set("email",d.email),c.set("fbid",d.id),console.log("casaperro = ",d),c.save(null,{success:function(c){b=Parse.User.current(),a&&a.successSignup&&a.successSignup(c)},error:function(a,b){alert("Failed to create new object, with error code: "+b.message)}})}))},error:function(b,c){console.log("User cancelled the Facebook login or did not fully authorize."),a&&a.error&&a.error(b,c)}})},isLoggedIn:function(){return b?!0:!1},getCurrentUser:function(){return b},setPreviousUrl:function(b){a=b},getPreviousUrl:function(){return a},clearPreviousUrl:function(){a=void 0},getCurrentUserData:function(a){Parse.User.current().fetch().then(function(b){a.success(b)})},updateCurrentUserData:function(a,c,d,e){b.set("fullname",a),b.set("email",c),b.set("phone",d),b.save(null,{success:function(a){e&&e.success&&e.success(a)},error:function(a,b){e&&e.error&&e.error(a,b)}})},uploadProfileImg:function(a,c){Parse.File(a.name,a);var d=new Parse.File(b.get("username")+"-avatar",a);d.save().then(function(){b.set("avatar",d),b.save(null,{success:function(a){c&&c.success&&c.success(a)},error:function(a,b){c&&c.error&&c.errorUser(a,b)}})},function(a){c.errorFile(a)})},resetPassword:function(a,b){Parse.User.requestPasswordReset(a,{success:function(){b.success&&b.success()},error:function(a){b.error&&b.error(a)}})}}}),angular.module("test150327App").controller("LogoutCtrl",["$scope","$location","auth",function(a,b,c){c.logout(function(){b.path("/")})}]),angular.module("test150327App").controller("NavbarCtrl",["$scope","auth","$location",function(a,b,c){a.isLoggedIn=b.isLoggedIn,a.getCurrentUser=b.getCurrentUser,a.actUser={},a.fbProfileUrl="",a.$watch(function(){return a.getCurrentUser()},function(){a.isLoggedIn()?b.getCurrentUserData({success:function(b){a.actUser=b,a.actUser.get("fbid")&&(a.fbProfileUrl="http://graph.facebook.com/"+a.actUser.get("fbid")+"/picture?type=square"),a.$apply()}}):(a.actUser={},a.fbProfileUrl="",a.$apply())}),a.isActive=function(a){return a===c.path()}}]),angular.module("test150327App").controller("SignupCtrl",["$scope","auth","$location",function(a,b,c){a.error="",a.doSignUp=function(){b.signUp(a.form.user,a.form.pass,a.form.email,a.form.fullname,{success:function(){c.path("/"),a.$apply()},error:function(b,c){a.error=c.message,a.$apply()}})},a.doLoginFb=function(){b.loginFb({successSignup:function(){c.path("/"),a.$apply()},successLogin:function(){c.path("/"),a.$apply()},error:function(b,c){a.error=c.message,a.$apply()}})}}]),angular.module("test150327App").controller("ProtectedCtrl",["$scope","auth",function(a,b){a.user={},a.formData={},a.error="",a.success="",a.edit=!1,b.getCurrentUserData({success:function(b){a.user=b,a.$apply()}}),a.toggleEdit=function(){a.edit?a.edit=!1:(a.formData=a.user.toJSON(),a.edit=!0)},a.saveChanges=function(){b.updateCurrentUserData(a.formData.fullname,a.formData.email,a.formData.phone,{success:function(b){console.log("Yay! The Changes has been made correctly by Parse.com! ;)"),a.success="The Changes has been applied",a.user=b,a.edit=!1,a.$apply()},error:function(b,c){a.error=c.message,a.$apply()}})},a.uploadImg=function(){var c=$("#avatar")[0];if(c.files.length>0){var d=c.files[0];b.uploadProfileImg(d,{success:function(b){a.success="The Image has been uploaded",a.user=b,a.edit=!1,a.$apply()},errorUser:function(b,c){a.error=c.message,a.$apply()},errorFile:function(){a.error="The file either could not be read, or could not be saved to Parse.",a.$apply()}})}},$(document).on("change",".btn-file :file",function(){var a=$(this),b=a.get(0).files?a.get(0).files.length:1,c=a.val().replace(/\\/g,"/").replace(/.*\//,"");a.trigger("fileselect",[b,c])})}]),angular.module("test150327App").controller("ResetpasswordCtrl",["$scope","$location","auth",function(a,b,c){a.form={},a.resetpassword=function(){c.resetPassword(a.form.email,{success:function(){b.path("/login"),a.$apply()},error:function(b){a.error=b.message,a.$apply()}})}}]);