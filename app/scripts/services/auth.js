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

      //logout
      logout: function authLogout(cb) {
        Parse.User.logOut()
        .then(function () {
          currentUser = Parse.User.current();
          cb();
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
