// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
<<<<<<< HEAD
 
var emailSender = require('cloud/emailSending.js');
var type=undefined;
 
=======

var emailSender = require('cloud/emailSending.js');
var type=undefined;

>>>>>>> 1d3b3822db38a9ce9e731d1b6e9fc0a1238739e9
Parse.Cloud.beforeSave(Parse.User, function(request, response) {
  //these 2 are controlled by parse. :)
  /*if (!request.object.get("username")) {
    response.error("Username is required for signup");
  } else
  if (!request.object.get("password")) {
    response.error("Password is required for signup");
  } else*/
<<<<<<< HEAD
   
  //get client type
  type=request.object.get('type');
  request.object.remove('type');
   
=======
  
  //get client type
  type=request.object.get('type');
  request.object.remove('type');
  
>>>>>>> 1d3b3822db38a9ce9e731d1b6e9fc0a1238739e9
  if (!request.object.get("email")) {
    response.error("Email is required for signup");
  } else
  if (!request.object.get("fullname")) {
    response.error("Fullname is required for signup");
  } else {
    response.success();
  }
});
<<<<<<< HEAD
 
Parse.Cloud.afterSave(Parse.User, function(request) {
  if (!request.object.existed()) {
    Parse.Cloud.useMasterKey();
     
    var isVendor=false;
    if(type!=undefined){
        isVendor=true;
        type=undefined;
    }
 
=======

Parse.Cloud.afterSave(Parse.User, function(request) {
  if (!request.object.existed()) {
    Parse.Cloud.useMasterKey();
    
    var isVendor=false;
    if(type!=undefined){
    	isVendor=true;
    	type=undefined;
    }

>>>>>>> 1d3b3822db38a9ce9e731d1b6e9fc0a1238739e9
    query = new Parse.Query(Parse.Role);
    query.equalTo("name", "buyer");
    query.first ( {
      success: function(object) {
<<<<<<< HEAD
 
        object.relation("users").add(request.user);
 
        object.save();
 
 
=======

        object.relation("users").add(request.user);

        object.save();


>>>>>>> 1d3b3822db38a9ce9e731d1b6e9fc0a1238739e9
      },
      error: function(error) {
        throw "Got an error " + error.code + " : " + error.message;
      }
    });
  };
});
<<<<<<< HEAD
 
=======

>>>>>>> 1d3b3822db38a9ce9e731d1b6e9fc0a1238739e9
/*
curl -X POST -H "X-Parse-Application-Id: VdnHbNNGjRWrRzYIdOlndzSBppkrOt3bySgdDfaB" -H "X-Parse-REST-API-Key: SIaXQy4cb9Enhb0AdKu4A0B5JGZ64qJimtuB2OwX" -H "Content-Type: application/json" -d "{}" -k https://api.parse.com/1/functions/testEmail
*/
Parse.Cloud.define("testEmail", function(request, response) {
<<<<<<< HEAD
    emailSender.sendEmail("tumail","Cintia PE EME");
    //emailSender.sendEmail("sergiojara3roa@gmail.com","Sergio Jara");
    response.success("se envio papa!!! thanks to nico cloud code master analyst");
=======
	emailSender.sendEmail("tumail","Cintia PE EME");
	//emailSender.sendEmail("sergiojara3roa@gmail.com","Sergio Jara");
	response.success("se envio papa!!! thanks to nico cloud code master analyst");
>>>>>>> 1d3b3822db38a9ce9e731d1b6e9fc0a1238739e9
});