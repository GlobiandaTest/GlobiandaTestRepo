// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
 
var emailSender = require('cloud/emailSending.js');
var type=undefined;
 
/*Parse.Cloud.beforeSave(Parse.User, function(request, response) {
  //these 2 are controlled by parse. :)
  if (!request.object.get("username")) {
    response.error("Username is required for signup");
  } else
  if (!request.object.get("password")) {
    response.error("Password is required for signup");
  } else
   
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
});*/

Parse.Cloud.afterSave("Vianda", function(request) {
  if (!request.object.existed()) {
    var name = request.object.get('name');
    Parse.Cloud.run('sendFBNotification', {'comida': name});
  };
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
        console.log("changed role");
 
      },
      error: function(error) {
        throw "Got an error " + error.code + " : " + error.message;
      }
    });
  };
});

Parse.Cloud.define("sendFBNotification", function(request) {
  Parse.Cloud.useMasterKey();
  console.log('[info] -- entroooooooo yeahhhh :O :P');
  var query = new Parse.Query(Parse.User);
  query.exists("fbid");

  query.find({

    success: function (results) {

      console.log("[info] -- " + results.length);

      var fbid = [];

      for (var i = 0; i < results.length; i++) {
        var text = ""+results[i].get('fbid');
        fbid.push(text);
      };

      var param = request.params.comida.toString();
      var comida = param.replace(' ', '%20');

      for (var j = 0; j < fbid.length; j++) {
        var fbUserId = fbid[j];
        var app_access_token = "1415345535439091|DgauKNj_r4Lp6jsFlLswEn72Sps";
        var template = "Nueva%20vianda%20disponible:%20"+comida;
        var href = "/index.html/";

        var url = "https://graph.facebook.com/"+fbUserId+"/notifications?access_token="+app_access_token+"&template="+template+"&href="+href;

        Parse.Cloud.httpRequest({
          method: "POST",
          url: url,

          success: function(httpResponse) {
            console.log(httpResponse.text);
          },

          error: function(httpResponse) {
            console.error('Request failed with response code'+ httpResponse.status);
            
          }
        });

      }
    },

    error: function(error) {
      console.error(error.message);
    }
  })
});
 
/*
curl -X POST -H "X-Parse-Application-Id: VdnHbNNGjRWrRzYIdOlndzSBppkrOt3bySgdDfaB" -H "X-Parse-REST-API-Key: SIaXQy4cb9Enhb0AdKu4A0B5JGZ64qJimtuB2OwX" -H "Content-Type: application/json" -d "{}" -k https://api.parse.com/1/functions/testEmail
*/
Parse.Cloud.define("testEmail", function(request, response) {
    emailSender.sendEmail("tumail","Cintia PE EME");
    //emailSender.sendEmail("sergiojara3roa@gmail.com","Sergio Jara");
    response.success("se envio papa!!! thanks to nico cloud code master analyst");
});


/*
curl -X POST -H "X-Parse-Application-Id: VdnHbNNGjRWrRzYIdOlndzSBppkrOt3bySgdDfaB" -H "X-Parse-REST-API-Key: SIaXQy4cb9Enhb0AdKu4A0B5JGZ64qJimtuB2OwX" -H "Content-Type: application/json" -d "{}" -k https://api.parse.com/1/functions/testFB
*/
Parse.Cloud.define("testFB", function(request, response) {
    var fbUserId = "10153257365493112";
    var app_access_token = "1415345535439091|DgauKNj_r4Lp6jsFlLswEn72Sps";
    var template = "Nueva%20vianda%20disponible%20";
    var href = "http://globianda-dev-test.parseapp.com/";

    var url = "https://graph.facebook.com/"+fbUserId+"/notifications?access_token="+app_access_token+"&template="+template+"&href="+href;

    Parse.Cloud.httpRequest({
      method: "POST",
      url: url,

      success: function(httpResponse) {
        console.log(httpResponse.text);
        response.success("se envio papa!!! thanks to nico cloud code master analyst");
      },

      error: function(httpResponse) {
        console.error('Request failed with response code '+ httpResponse.status);
        response.error("NO se envio papa!!! thanks to nico cloud code master analyst");
        
      }
    });
});