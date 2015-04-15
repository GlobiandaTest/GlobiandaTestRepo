'use strict';

/**
 * @ngdoc service
 * @name test150327App.auth
 * @description
 * # auth
 * Factory in the test150327App.
 */
angular.module('test150327App')
  .factory('auth', function () {

    // some user data
    var currentUser, currentRoles;
   
    // previous url for login
    var previousUrl;

    function UpdateCurrentUser(){
      //update current user
      currentUser = Parse.User.current();
      //guests has "guest" role
      currentRoles = [new Parse.Role('guest', new Parse.ACL())];
      if(currentUser){
        var roles = new Parse.Query(Parse.Role);
        //get roles...
        roles.equalTo("users",currentUser).find({
          success:function(results) {
            if(results.length){
              currentRoles = results;
              //append internal roles...
              for (var i = 0; i < results.length; i++){
                results[i].getRoles().query().find({
                  success: function(sresults) {
                    currentRoles = currentRoles.concat(sresults);
                  },
                  error: function(error) {
                    console.log(error);
                  }
                });
              }
            }else{
              //fix users without roles
              currentRoles = [new Parse.Role('user', new Parse.ACL())];
              console.log("Warning! user hasn't roles!");
            }
          },
          error:function(error) {
            console.log("Error when getting user roles!");
          }
        });
      }
    }
    
    //Initial user data...
    UpdateCurrentUser();
    
    // Public API here
    return {

      // login
      login: function authLogin(user,pass,cb) {
        Parse.User.logIn(user,pass, {
          success: function(user) {
            UpdateCurrentUser();
            if (cb && cb.success) {
              cb.success(user);
            }
          },
          error: function (user, error) {
            if(cb && cb.error) {
              cb.error(user, error);
            }
          }
        })
      },

      //sign up
      signUp: function authSignUp(username, password, email, fullname, cb){
        var user = new Parse.User();
        user.set('username', username);
        user.set('password', password);
        user.set('email', email);
        user.set('fullname', fullname);
        user.signUp(null, {
          success: function (user) {
            UpdateCurrentUser();
            if (cb && cb.success) {
              cb.success(user);
            }
          },
          error: function (user, error) {
            if (cb && cb.error) {
              cb.error(user, error);
            }
          }
        });
      },

      //logout
      logout: function authLogout(cb) {
        if(currentUser){
          Parse.User.logOut().then(function () {
            UpdateCurrentUser();
            if (cb && cb.success)
              cb.success();
          });
        }else if(cb && cb.error){
          cb.error('User not logged');
        }
      },

      //loginfb
      loginFb: function authLoginFb(cb) {
        Parse.FacebookUtils.logIn("email", {
          success: function(user) {
            if (!user.existed()) {
              FB.api('/me', function(me){
                user.set("fullname", me.name);
                user.set("email", me.email);
                user.set("fbid", me.id);
                user.save(null, {
                  success: function(user) {
                    // Execute any logic that should take place after the object is saved.
                    UpdateCurrentUser();
                    if (cb && cb.successSignup) {
                      cb.successSignup(user);
                    }
                  },
                  error: function(user, error) {
                    // Execute any logic that should take place if the save fails.
                    // error is a Parse.Error with an error code and message.
                    console.log('Failed to create new object, with error code: ' + error.message);
                  }});
              });
            } else {
              UpdateCurrentUser();
              if (cb && cb.successLogin) {
                cb.successLogin(user);
              }
            }
          },
          error: function(user, error) {
            if (cb && cb.error) {
                cb.error(user, error);
            }
          }
        });
      },

      //is logged in
      isLoggedIn: function authIsLoggedIn() {
        return (currentUser != null);
      },

      //get user roles
      getRoles: function authGetRoles() {
        return currentRoles;
      },

      //check user has a role or roles
      hasAccess: function authHasAccess(access) {
        if(currentRoles.length){
          if(!$.isArray(access))
            access=[access];
          for (var i = 0; i < currentRoles.length; i++) {
            if(currentRoles[i].attributes){
              var r = currentRoles[i].get('name');
              if($.inArray(r, access)!=-1){
                return true;
              }
            }
          }
        }
        return false;
      },

      //get current user
      getCurrentUser: function authGetCurrentUser() {
        return currentUser;
      },

      // set url
      setPreviousUrl: function authSetPreviousUrl (url) {
        previousUrl = url;
      },

      // get url
      getPreviousUrl: function authGetPreviousUrl () {
        return previousUrl;
      },

      // clear the url
      clearPreviousUrl: function authClearPreviousUrl () {
        previousUrl = undefined;
      },

      getCurrentUserData: function authGetCurrentUserData (cb) {
        if(currentUser){
          currentUser.fetch().then(function (us) {
            if(cb && cb.success){
              cb.success(us);
            }
          });
        }else if(cb && cb.error){
          cb.error('User not logged');
        }
      },

      updateCurrentUserData: function authUpdateCurrentUserData (fullname, email, phone, cb) {
        currentUser.set('fullname', fullname);
        currentUser.set('email', email);
        currentUser.set('phone', phone);
        currentUser.save(null, {
          success: function (us) {
            if (cb && cb.success) {
              cb.success(us);
            }
          },
          error: function (us, error) {
            if (cb && cb.error) {
              cb.error(us, error);
            }
          }
        });
      },

      uploadProfileImg: function authUploadProfileImg (file, cb) {
        
        Parse.File(file.name, file);
        var avatar = new Parse.File(currentUser.get('username')+"-avatar", file);

        avatar.save().then(function() {
          currentUser.set('avatar', avatar);
          currentUser.save(null, {
            success: function (us) {
              if (cb && cb.success) {
                cb.success(us);
              }
            },
            error: function (us, error) {
              if (cb && cb.error) {
                cb.errorUser(us, error);
              }
            }
          });
        }, function(error) {
          if(cb && cb.errorFile){
            cb.errorFile(error);
          }
        });
      },

      // resetPassword
      resetPassword: function authResetPassword (email, cb) {
        Parse.User.requestPasswordReset(email, {
          success: function() {
            if(cb && cb.success){
              cb.success();
            }
          },
          error: function(error) {
            if(cb && cb.error){
              cb.error(error);
            }
          }
        });
      }

    };
  });
