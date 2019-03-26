const express = require('express');
const app = express();
const request = require('request');

process.env.NODE_ENV = 'production';

const config = require('config');
const secondMSConfig = config.get('microservice.config');

app.get('/ms2listUsers', function (req, res) {
   //res.send("ms2 users list");
   
   request('http://'+secondMSConfig.host+"/getStatus",function(error,response,body){
      const services_status = JSON.parse(body);
      //res.send(services_status);
   
      for(let i=0;i<services_status.length;i++){
         
         if(services_status[i]['config']['name']=='first Microservice' && services_status[i]['success']==true){

            request(services_status[i]['config']['url']+":"+services_status[i]['port']+"/ms1listUsers",function(error,response,body){
               res.send("this is service 2 sending response of service 1 ::"+body);
            })
         }
         break;
      }
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