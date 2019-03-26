const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//process.env.NODE_ENV = 'production';
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const config = require('config'); 

const firstMSConfig = config.get('microservice.config');

app.get('/ms1listUsers', function (req, res) {
	//res.send("ms1 users list: shri hariji");
	res.header('content-type', 'application/json')
	res.send({"ms1 users list:":" shri hariji"});
})

app.get('/heartbeat', function(req, res){
	
	var status = {
		success: true,
		address: server.address().address,
		port: server.address().port
	 };
	
	res.send(status);
});

const server = app.listen(firstMSConfig.port,function () {
   const host = server.address().address
   const port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})