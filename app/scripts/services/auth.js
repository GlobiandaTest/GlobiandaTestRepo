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
    // Service logic
    // ...

    // someone is logged in?? yes -> user, no -> null
    var currentUser = Parse.User.current();
   

    // Public API here
    return {

      // login
      login: function authLogin(user,pass,cb) {
        Parse.User.logIn(user,pass, {
          success: function(user) {
            currentUser = Parse.User.current();
            if (cb.success) {
              cb.success(user);
            }
          },
          error: function (user, error) {
            if(cb.error) {
              cb.error(user, error);
            }
          }
        })
      },

      //sign up
      signUp: function authSignUp(username, password, email, cb){
        var user = new Parse.User();
        user.set('username', username);
        user.set('password', password);
        user.set('email', email);

        user.signUp(null, {
          success: function (user) {
            currentUser = Parse.User.current();
            if (cb.success) {
              cb.success(user);
            }
          },
          error: function (user, error) {
            if (cb.error) {
              cb.error(user, error);
            }
          }
        })
      },

      //logout
      logout: function authLogout(cb) {
        Parse.User.logOut()
        .then(function () {
          currentUser = Parse.User.current();
          cb();
        });
      },

      //loginfb
      loginFb: function authLoginFb(cb) {
        Parse.FacebookUtils.logIn("email", {
          success: function(user) {
            if (!user.existed()) {

              console.log("User signed up and logged in through Facebook!");
              FB.api('/me', function(me){
                user.set("username", me.name);
                user.set("email", me.email);
                console.log("casaperro = ", me);

                user.save(null, {
                  success: function(user) {
                    // Execute any logic that should take place after the object is saved.
                    currentUser = Parse.User.current();
                    if (cb && cb.successSignup) {
                      cb.successSignup(user);
                    }
                  },
                  error: function(user, error) {
                    // Execute any logic that should take place if the save fails.
                    // error is a Parse.Error with an error code and message.
                    alert('Failed to create new object, with error code: ' + error.message);
                  }});
              });
            } else {
              console.log("User logged in through Facebook!");
              currentUser = Parse.User.current();
              if (cb && cb.successLogin) {
                cb.successLogin(user);
              }
            }
          },
          error: function(user, error) {
            console.log("User cancelled the Facebook login or did not fully authorize.");
            if (cb && cb.error) {
                cb.error(user, error);
            }
          }
        });
      },

      //is logged in
      isLoggedIn: function authIsLoggedIn() {
        if (currentUser) {
          return true;
        } else {
          return false;
        }
      },

      //get current user
      getCurrentUser: function authGetCurrentUser() {
        return currentUser;
      }

    };
  });
