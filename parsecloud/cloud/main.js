// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:

Parse.Cloud.beforeSave(Parse.User, function(request, response) {
  //these 2 are controlled by parse. :)
  /*if (!request.object.get("username")) {
    response.error("Username is required for signup");
  } else
  if (!request.object.get("password")) {
    response.error("Password is required for signup");
  } else*/
  if (!request.object.get("email")) {
    response.error("Email is required for signup");
  } else
  if (!request.object.get("fullname")) {
    response.error("Fullname is required for signup");
  } else {
    response.success();
  }
});

/*

curl -X POST -H "X-Parse-Application-Id: VdnHbNNGjRWrRzYIdOlndzSBppkrOt3bySgdDfaB" -H "X-Parse-REST-API-Key: SIaXQy4cb9Enhb0AdKu4A0B5JGZ64qJimtuB2OwX" -H "Content-Type: application/json" -d "{}" -k https://api.parse.com/1/functions/testEmail
*/

var emailSender = require('emailSending.js');
Parse.Cloud.define("testEmail", function(request, response) {
  
sendEmail("jarasergio@outlook.com","Sergio jara");
sendEmail("sergiojara3roa@gmail.com","Sergio Jara");


 
});