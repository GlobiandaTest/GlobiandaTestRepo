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
    var currentUser;
   

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
      }

    };
  });
