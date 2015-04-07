
var Mandrill = require('mandrill');
Mandrill.initialize('vHa8A1DV1EfoY7INdZATbQ');


Mandrill.sendEmail({
  message: {
    text: "Hello World!",
    subject: "Using Cloud Code and Mandrill is great!",
    from_email: "parse@cloudcode.com",
    from_name: "Cloud Code",
    to: [
      {
        email: "jarasergio@outlook.com",
        name: "Sergio jara"
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


var sendEmail = function(toAddress, name)
{
	
var Mandrill = require('mandrill');
Mandrill.initialize('vHa8A1DV1EfoY7INdZATbQ');


Mandrill.sendEmail({
  message: {
    text: "Hello World!",
    subject: "Using Cloud Code and Mandrill is great!",
    from_email: "parse@cloudcode.com",
    from_name: "Cloud Code",
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