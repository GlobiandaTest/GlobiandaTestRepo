'use strict';

/**
 * @ngdoc function
 * @name test150327App.controller:RelacionCtrl
 * @description
 * # RelacionCtrl
 * Controller of the test150327App
 */
angular.module('test150327App')
  .controller('RelacionCtrl', function ($scope) {

  	var usuario = Parse.User.current();

  	/*var query = new Parse.Query('Vianda');
  	query.equalTo('name','Alto Guiso');
  	query.first({
  		success: function (vianda) {
  			usuario.set('vende', vianda);
  			usuario.set('compra', vianda);
  			usuario.save({
  				success: function () {
  					alert('it works, or hope so...')
  				}
  			});
  		}
  	});*/


  var altoGuiso;

  var query = new Parse.Query('Vianda');
  query.equalTo('name','Alto Guiso');
  query.first({
  	success: function (vianda) {
  		var qusuarios = new Parse.Query(Parse.User);
  		qusuarios.equalTo('compra', vianda);
  		qusuarios.find({
  			success: function (data) {
  				console.log(data);
  				for (var i = data.length - 1; i >= 0; i--) {
  					console.log(data[i].get('username'));
  				}
  			}
  		});
  	}
  });


  });
