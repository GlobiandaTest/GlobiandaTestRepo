
//var Mandrill = require('mandrill');
//Mandrill.initialize('vHa8A1DV1EfoY7INdZATbQ');




exports.sendEmail = function(toAddress, htmlstring)
{
	
  var Mandrill = require('mandrill');
  Mandrill.initialize('vHa8A1DV1EfoY7INdZATbQ');


  Mandrill.sendEmail({
    
    "message": {
      "html" : htmlstring,
      "text" : "Casa perro 12.38",
      "subject": "[Globianda] - TEST - Ofertas del día",
      "from_email": "globianda@globant.com",
      "from_name": "Globianda",
      "to": toAddress,
    },
    async: true
  },{
    success: function(httpResponse) {
      console.log('ando!');
      console.log(httpResponse);
      response.success("Email sent!");
    },
    error: function(httpResponse) {
      console.log('NO ando!');
      console.error(httpResponse);
      response.error("Uh oh, something went wrong");
    }
  });



};