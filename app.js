var express = require('express');
var bodyParser = require('body-parser');
var numCPUs = require('os').cpus().length;
cluster = require('cluster');
clustering = false;

if(clustering){
	//trying clustering...
	if (cluster.isMaster) {
		// Fork workers.
		for (var i = 0; i < numCPUs; i++) {
			cluster.fork();
		}
		cluster.on('exit', function(worker, code, signal) {
			console.log('worker ' + worker.process.pid + ' died');
		});
	}
	else {
		//Code Igniter inspired framework
		var Sudo = require('./system/sudo.js');
		var app = express();
		app.use(bodyParser.json()); // support json encoded bodies
		app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
		var sudo = new Sudo(app);
	}
}
else{
	//Code Igniter inspired framework
	var Sudo = require('./system/sudo.js');
	var app = express();
	app.use(bodyParser.json()); // support json encoded bodies
	app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
	var sudo = new Sudo(app);
}