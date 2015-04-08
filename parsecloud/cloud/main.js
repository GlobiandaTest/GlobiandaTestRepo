// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
 
var emailSender = require('cloud/emailSending.js');
var type=undefined;
 
Parse.Cloud.beforeSave(Parse.User, function(request, response) {
  //these 2 are controlled by parse. :)
  /*if (!request.object.get("username")) {
    response.error("Username is required for signup");
  } else
  if (!request.object.get("password")) {
    response.error("Password is required for signup");
  } else*/
   
  //get client type
  type=request.object.get('type');
  request.object.remove('type');
   
  if (!request.object.get("email")) {
    response.error("Email is required for signup");
  } else
  if (!request.object.get("fullname")) {
    response.error("Fullname is required for signup");
  } else {
    response.success();
  }
});
 
Parse.Cloud.afterSave(Parse.User, function(request) {
  if (!request.object.existed()) {
    Parse.Cloud.useMasterKey();
     
    var isVendor=false;
    if(type!=undefined){
        isVendor=true;
        type=undefined;
    }
 
    query = new Parse.Query(Parse.Role);
    query.equalTo("name", "buyer");
    query.first ( {
      success: function(object) {
 
        object.relation("users").add(request.user);
 
        object.save();
 
 
      },
      error: function(error) {
        throw "Got an error " + error.code + " : " + error.message;
      }
    });
  };
});
 
/*
curl -X POST -H "X-Parse-Application-Id: VdnHbNNGjRWrRzYIdOlndzSBppkrOt3bySgdDfaB" -H "X-Parse-REST-API-Key: SIaXQy4cb9Enhb0AdKu4A0B5JGZ64qJimtuB2OwX" -H "Content-Type: application/json" -d "{}" -k https://api.parse.com/1/functions/testEmail
*/
Parse.Cloud.define("testEmail", function(request, response) {
    emailSender.sendEmail("tumail","Cintia PE EME");
    //emailSender.sendEmail("sergiojara3roa@gmail.com","Sergio Jara");
    response.success("se envio papa!!! thanks to nico cloud code master analyst");
});