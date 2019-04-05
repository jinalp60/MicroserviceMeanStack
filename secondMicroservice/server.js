const express = require('express');
const app = express();
const request = require('request');

process.env.NODE_ENV = 'production';

const config = require('config');
const secondMSConfig = config.get('microservice.config');
const gatewayConfig = config.get('api-gateway.config');

app.get('/ms2listUsers', function (req, res) {
   //res.send("ms2 users list");
   //we can call heartbeat api first to check whether the endpoint is up or not 
   request('http://'+gatewayConfig.host+":"+gatewayConfig.port+"/firstms/ms1listUsers",function(error,response,body){
      res.send("this is service 2 sending response of service 1 ::"+body);   
   })
})

app.get('/heartbeat', function(req, res){
	var status = {
		success: true,
		address: server.address().address,
		port: server.address().port
	 };
	
	res.send(status);
});

const server = app.listen(secondMSConfig.port,function () {
   const host = server.address().address
   const port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})