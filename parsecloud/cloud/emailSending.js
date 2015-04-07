
//var Mandrill = require('mandrill');
//Mandrill.initialize('vHa8A1DV1EfoY7INdZATbQ');




exports.sendEmail = function(toAddress, name)
{
	
var Mandrill = require('mandrill');
Mandrill.initialize('vHa8A1DV1EfoY7INdZATbQ');


Mandrill.sendEmail({
  message: {
    text: "CasaperroDevs Team Bencher * Using Cloud Code and Mandrill is great and work DONE XDDDDDDdDD !",
    subject: "[TEST] Spam HOUR Authorizated by TL!!!",
    from_email: "prueba@parse.com",
    from_name: "globianda notification",
    to: [
      {
        email: toAddress,
        name: name
      }
    ]
  },
  async: true
},{
  success: function(httpResponse) {
    console.log(httpResponse);
    response.success("Email sent!");
  },
  error: function(httpResponse) {
    console.error(httpResponse);
    response.error("Uh oh, something went wrong");
  }
});



};