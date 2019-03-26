var express = require("express");
var app = express();

process.env.NODE_ENV = "production";

var config = require("config");
var microserviceConfig = config.get("microservice.config");

var model = require("./models/gatewayModel");

app.get("/", function(req, res) {
  res.send("running fine" + microserviceConfig.host + microserviceConfig.port);
});

app.get("/api_tester", function(req, res) {
  res.send("api tester");
});
app.get('/heartbeat', function(req, res){
	
	var status = {
		success: true,
		address: server.address().address,
		port: server.address().port
	 };
	
	res.send(status);
});
// Get JSON Reporting data by report name
app.get("/getStatus", function(req, res) {
  //console.log("configuration:",microserviceConfig);
  var promises = model.GetStatus(microserviceConfig.services);

  Promise.all(promises)
    .then(function(values) {
      for (var i = 0; i < values.length; i++) {
        var value = values[i];

        if (value.address && value.port) {
          for (var j = 0; j < microserviceConfig.services.length; j++) {
            //microserviceConfig.services[j].address == value.address &&
            if (microserviceConfig.services[j].port == value.port) {
              value.config = microserviceConfig.services[j];
            }
          }
        }
      }
      res.send(values);
    })
    .catch(function(err) {
      res.send(err);
    });
});

var server = app.listen(microserviceConfig.port, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Server Running On: http://%s:%s", host, port);
});
