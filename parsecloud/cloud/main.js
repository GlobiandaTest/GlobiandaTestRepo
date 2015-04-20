// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
  
var emailSender = require('cloud/emailSending.js');
var Image = require('parse-image');
var type=undefined;
 
 
// https://parse.com/docs/cloud_modules_guide#images-example
  
Parse.Cloud.beforeSave(Parse.User, function(request, response) {
   
  var user = request.object;
   
  if (!user.get('avatar')) {
    response.success();
    return;
  };
 
  if (!user.dirty('avatar')) {
    response.success();
    return;
  };
 
  Parse.Cloud.httpRequest({
    url:  user.get('avatar').url()
 
  }).then(function(response) {
    var image = new Image();
    return image.setData(response.buffer);
 
  }).then(function(image) {
    // transformar en cuadrado tomando el menor valor entre altura y ancho
    var size = Math.min(image.width(), image.height());
    return image.crop({
      left: (image.width() - size) / 2,
      top: (image.height() - size) / 2,
      width: size,
      height: size
    });
 
  }).then(function(image) {
    // achicar
    return image.scale({
      width: 96,
      height: 96
    });
 
  }).then(function(image) {
    // JPEG es mas liviano
    return image.setFormat('JPEG');
 
  }).then(function(image) {
    // Poner la data en un buffer
    return image.data();
 
  }).then(function(buffer) {
    // guardar en un file
    var base64 = buffer.toString('base64');
    var cropped = new Parse.File(user.get('username')+'-thumb.jpg', {base64: base64});
    return cropped.save();
 
  }).then(function(cropped) {
    user.set('thumbnail', cropped);
 
  }).then(function(result) {
    response.success();
  }, function(error) {
    response.error(error)
  });
 
  //these 2 are controlled by parse. :)
  /*if (!request.object.get("username")) {
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
  }*/
});
 
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
      var comida = param.replace(/ /g, '%20');
      console.log(comida);
 
      for (var j = 0; j < fbid.length; j++) {
        var fbUserId = fbid[j];
        var app_access_token = "1415345535439091|DgauKNj_r4Lp6jsFlLswEn72Sps";
        var template = "Nueva%20vianda%20disponible:%20"+comida;
        var href = "index.html/";
 
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
  
  Parse.Cloud.useMasterKey();

  var date = new Date();

  var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  var tomorrow = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);

  var query = new Parse.Query('Vianda');
  query.lessThan('publish', tomorrow);
  query.greaterThanOrEqualTo('publish', today);
  query.find({
    success: function (results) {
      var comidas = [];
      //console.log(results);
      for (var i = 0; i <= results.length; i++) {
        var comida = {};
        console.log(results[i].get('seller'));
        comida.name = results[i].get('name');
        comida.desc = results[i].get('description');
        comida.seller = results[i].get('seller');
        comida.price = results[i].get('price');
        comida.img = results[i].get('image').url;
        comidas[i] = comida;
      };

      var html;

      html = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> <html xmlns="http://www.w3.org/1999/xhtml"> <head> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /><title>Globianda</title><meta name="viewport" content="width=device-width, initial-scale=1.0"/> </head><body style="margin: 0; padding: 0; font-family: Helvetica, Arial, sans-serif"> <table border="0" cellpadding="0" cellspacing="0" width="100%" > <table align="center" border="0" cellspacing="0" width="580px" style="border-collapse: collapse;"> <tr> <td bgcolor="#666666" align="right" style="padding: 0 10px 0 10px; color: #ffffff; font-size: 12px"> {{email_date}} </td> </tr> <tr> <td bgcolor="#666666" align="center" style="padding: 40px 0 30px 0; color: #ffffff;"> <h1>Globianda</h1> </td> </tr> <tr> <td bgcolor="#dddddd" align="justify" style="padding: 15px 15px 15px 15px;"> <h3 align="center">Ofertas del Día</h3> <p>En el día de hoy, Globianda está ofreciendo las siguientes especialidades gourmet para que degustes de la mejor comida desde tu puesto de trabajo. </p> </td> </tr> <tr> <td bgcolor="#ffffff" style="padding: 30px 30px 30px 30px;"> <table border="0" cellpadding="0" cellspacing="0" width="100%">';
      html = html.replace('{{email_date}}', today);

      for (var i = comidas.length - 1; i >= 0; i--) {
        var item = '<tr><td colspan="2" align="center" bgcolor="#666666"><h4 style="margin: 5px 5px 5px 5px; color: #ffffff">{{vianda_name}}</h4></td></tr><tr><td width="40%" align="center" style="padding: 5px 5px 5px 5px;" bgcolor="#eeeeee"><img src="{{vianda_img}}" style="border-radius: 4px;" /></td><td width="60%" align="justify" style="padding: 5px 5px 5px 5px;" bgcolor="#eeeeee"><p><b>Descripción: </b>{{vianda_desc}}</p><p><b>Vendedor: </b>{{vianda_seller}}</p><p><b>Precio: </b> ${{vianda_price}} - <a href="{{vianda_url}}" style="color: #000000;">Ver</a></p></td></tr><tr><td colspan="2">&nbsp;</td></tr>';
        item = item.replace('{{vianda_name}}',comidas[i].name).replace('{{vianda_img}}', comidas[i].img).replace('{{vianda_desc}}', comidas[i].desc).replace('{{vianda_seller}}', comidas[i].seller).replace('{{vianda_price}}', comidas[i].price);
        html = html + item;
      };

      var queryUser = new Parse.Query(Parse.User);
      queryUser.exists('email');
      query.find({
        success: function (resultusers) {

          console.log("cantidad de usuarios: " + resultusers.length);

          var destination = [];
          for (var j = 0; j <= resultusers.length; j++) {
            var dest = {};
            dest.email = resultusers[j].get('email');
            dest.name = resultusers[j].get('fullname');
            destination[j] = dest;
          };

          emailSender.sendEmail(destination,html);
          response.success("se envio papa!!! thanks to nico cloud code master analyst");
        }
      });

    }
  })
    
    /*var comidas = [
      {
        name: 'Choripan',
        desc: 'Lo mejor de lo mejor en el mundo, nunca más vas querer otro choripan.',
        seller: 'Maru Botana',
        price: '30',
        img: 'http://lorempixel.com/176/144/food/1'
      },
      {
        name: 'Milanesa',
        desc: 'Lo mejor de lo mejor en el mundo, nunca más vas querer otra milanesa.',
        seller: 'Elba Masterchef',
        price: '30',
        img: 'http://lorempixel.com/176/144/food/2'
      },
      {
        name: 'Cabeza de chancho',
        desc: 'Lo mejor de lo mejor en el mundo, nunca más vas querer otra cabeza de chancho.',
        seller: 'Narda Lepes',
        price: '30',
        img: 'http://lorempixel.com/176/144/food/3'
      }

    ];*/

    /*var html;

    html = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> <html xmlns="http://www.w3.org/1999/xhtml"> <head> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /><title>Globianda</title><meta name="viewport" content="width=device-width, initial-scale=1.0"/> </head><body style="margin: 0; padding: 0; font-family: Helvetica, Arial, sans-serif"> <table border="0" cellpadding="0" cellspacing="0" width="100%" > <table align="center" border="0" cellspacing="0" width="580px" style="border-collapse: collapse;"> <tr> <td bgcolor="#666666" align="right" style="padding: 0 10px 0 10px; color: #ffffff; font-size: 12px"> {{email_date}} </td> </tr> <tr> <td bgcolor="#666666" align="center" style="padding: 40px 0 30px 0; color: #ffffff;"> <h1>Globianda</h1> </td> </tr> <tr> <td bgcolor="#dddddd" align="justify" style="padding: 15px 15px 15px 15px;"> <h3 align="center">Ofertas del Día</h3> <p>En el día de hoy, Globianda está ofreciendo las siguientes especialidades gourmet para que degustes de la mejor comida desde tu puesto de trabajo. </p> </td> </tr> <tr> <td bgcolor="#ffffff" style="padding: 30px 30px 30px 30px;"> <table border="0" cellpadding="0" cellspacing="0" width="100%">';
    html = html.replace('{{email_date}}', 'Hoy es el dia de hoy');

    for (var i = comidas.length - 1; i >= 0; i--) {
      var item = '<tr><td colspan="2" align="center" bgcolor="#666666"><h4 style="margin: 5px 5px 5px 5px; color: #ffffff">{{vianda_name}}</h4></td></tr><tr><td width="40%" align="center" style="padding: 5px 5px 5px 5px;" bgcolor="#eeeeee"><img src="{{vianda_img}}" style="border-radius: 4px;" /></td><td width="60%" align="justify" style="padding: 5px 5px 5px 5px;" bgcolor="#eeeeee"><p><b>Descripción: </b>{{vianda_desc}}</p><p><b>Vendedor: </b>{{vianda_seller}}</p><p><b>Precio: </b> ${{vianda_price}} - <a href="{{vianda_url}}" style="color: #000000;">Ver</a></p></td></tr><tr><td colspan="2">&nbsp;</td></tr>';
      item = item.replace('{{vianda_name}}',comidas[i].name).replace('{{vianda_img}}', comidas[i].img).replace('{{vianda_desc}}', comidas[i].desc).replace('{{vianda_seller}}', comidas[i].seller).replace('{{vianda_price}}', comidas[i].price);
      html = html + item;
    };

    html = html + '</table> </td> </tr> <tr> <td bgcolor="#666666" align="center" style="padding: 15px 15px 15px 15px; color: #ffffff;"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td width="60%"> <p><a href="http;//www.globianda.com/" style="color: #ffffff; font-weight: bold">Ingresá a la Página</a></p> <p style="font-weight: bold">&copy; 2015 - Globianda Corp.</p> </td> <td width="40%" align="right"><a href="http://www.facebook.com/globianda"><img src="https://zephoria.com/wp-content/themes/u-design/styles/common-images/facebook-icon.png" /></a></td> </tr> </table> </td> </tr> <tr> <td style="padding: 15px 15px 15px 15px">&nbsp;</td> </tr> </table> </table> </body> </html>';
*/
    /*var destination = [
      {
        "email": "ger_offspring@hotmail.com",
        "name": 'German'
      },
      {
        "email": "lujanfernandogabriel@gmail.com",
        "name": 'Fernando'
      },
      {
        "email": "sergio.jara@globant.com",
        "name": 'Sergio'
      },
      ];
*/
   /* emailSender.sendEmail(destination,html);
    //emailSender.sendEmail("sergiojara3roa@gmail.com","Sergio Jara");
    response.success("se envio papa!!! thanks to nico cloud code master analyst");*/
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