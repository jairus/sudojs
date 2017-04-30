//author: Jairus Bondoc
//class: Sudo
//description: Code Igniter inspired class to load controllers from routes array config

//global variables
SD = {};
SD.config = require('../application/config/config.js');
SD.db = require('../application/config/database.js');
SD.autoload = require('../application/config/autoload.js');
SD.routes = require('../application/config/routes.js');
//global base classes
SD_Controller = require('./baseclasses.js');
SD_Model = require('./baseclasses.js');
SD_Library = require('./baseclasses.js');

class Sudo{
	constructor(app){
		var port = SD.config['port'];
		var routeindex;
		var autoloadindex;
		var controllers = {};
		var fs = require('fs');
		var path = require('path');
		var loader = require('./loader.js');
		var printerror = [];
		for(autoloadindex in SD.autoload){
			if(autoloadindex=="helpers"){
				var load = SD.autoload[autoloadindex];
				for(var i=0; i<load.length; i++){
					try{
						require('../application/helpers/'+load[i]+'_helper.js');
					}
					catch(e){
						printerror.push(e.message);
						break;
					}
				}
			}
		}
		for(routeindex in SD.routes){
			if(routeindex!="*"){
				var cbBind = {};
				cbBind.routeindex = routeindex;
				var controllerArr = SD.routes[routeindex];
				controllerArr = controllerArr.split("/");
				cbBind.controllerArr = controllerArr;
				app.all(routeindex, function (preq, pres) {
					if(printerror.length>0){
						pres.send(printerror[0]);
						return;
					}
					var routeindex = this.routeindex;
					var controller = controllers[this.routeindex];	
					var controllerArr = this.controllerArr;
					var controllerFileName = controllerArr[0];					
					var controllerFunction = controllerArr[1];
					var file = path.dirname(__filename)+'/../application/controllers/'+controllerFileName+'.js';
					//check if controller file exists
					if (fs.existsSync(file)) {
						var controllerClass = require(file);
					}
					else{
						pres.send("Controller <b>"+controllerFileName+".js</b> file not found");
						return;
					}
					if(typeof(controllerFunction)=="undefined"||controllerFunction==""){
						controllerFunction = "index"; //use index as the default method
					}
					var args = {};
					args.controllerFilePath = file;
					args.controllerFunction = controllerFunction;
					args.route = routeindex;
					args.req = preq;
					args.res = pres;
					//loader object
					args.load = (new loader(args));
					//auto load models
					/*
					for(autoloadindex in autoload){
						console.log(autoloadindex);
						if(autoloadindex=="models"){
							console.log(autoloadindex);
							var load = autoload[autoloadindex];
							for(var i=0; i<load.length; i++){
								args[load[i]] = args.load.model(load[i]);
							}
						}
					}
					*/
					controller = new controllerClass(args);
					if(typeof(controller)=="undefined"){
						pres.send("<b>"+controllerFileName+"</b> not found");
						return;
					}
					else{
						if(typeof(controller[controllerFunction])=="function"){
							var funcargs = [];
							var param;
							var n = 0;
							for(param in preq.params){
								funcargs[n] = preq.params[param];
								n++;
							}
							n=0;
							for(var i=2; i<controllerArr.length; i++){
								funcargs[n] = controllerArr[i];
								n++;
							}
							controller[controllerFunction](funcargs);
						}
						else{
							pres.send("<b>"+controllerFunction+"</b> in controller <b>"+controllerFileName+".js</b> is not a function");
							return;
						}
					}
					console.log("routeindex: "+this.routeindex+", path: "+preq.path, ", controller file: "+file)
					return;
				}.bind(cbBind));
			}
		}
		app.all("*", function (preq, pres) {
			var routeindex = preq.path;
			var controllerArr = SD.routes[routeindex];
			if(typeof(controllerArr)=="undefined"){
				controllerArr = routeindex;
				controllerArr = controllerArr.substring(1, controllerArr.length);
			}
			controllerArr = controllerArr.split("/");
			var controllerFileName = controllerArr[0];
			var controllerFunction = controllerArr[1];
			
			var file = path.dirname(__filename)+'/../application/controllers/'+controllerFileName+'.js';
			//check if controller file exists
			if (fs.existsSync(file)) {
				var controllerClass = require(file);
			}
			else{
				routeindex = "*";
				if(controllerFileName==""){ //if web root
					pres.send("Route for / not found");
					return;
				}
				//catch all
				else if(typeof(SD.routes[routeindex])=="undefined"){
					pres.send("Route for * not found");
					return;
				}
				controllerArr = SD.routes[routeindex];
				controllerArr = controllerArr.split("/");
				controllerFileName = controllerArr[0];
				controllerFunction = controllerArr[1];
				file = path.dirname(__filename)+'/../application/controllers/'+controllerFileName+'.js';
				//check if controller file exists
				if (fs.existsSync(file)) {
					var controllerClass = require(file);
				}
				else{
					pres.send("Controller <b>"+controllerFileName+".js</b> file not found");
					return;
				}
			}
			if(typeof(controllerFunction)=="undefined"||controllerFunction==""){
				controllerFunction = "index"; //use index as the default method
			}
			var args = {};
			args.controllerFilePath = file;
			args.controllerFunction = controllerFunction;
			args.route = routeindex;
			args.req = preq;
			args.res = pres;
			//loader object
			args.load = (new loader(args));
			//auto load models
			/*
			for(autoloadindex in autoload){
				console.log(autoloadindex);
				if(autoloadindex=="models"){
					console.log(autoloadindex);
					var load = autoload[autoloadindex];
					for(var i=0; i<load.length; i++){
						args[load[i]] = args.load.model(load[i]);
					}
				}
			}
			*/
			var controller = new controllerClass(args);
			if(typeof(controller[controllerFunction])=="function"){
				var funcargs = [];
				for(var i=2; i<controllerArr.length; i++){
					funcargs.push(controllerArr[i]);
				}
				controller[controllerFunction](funcargs);
			}
			else{
				pres.send("<b>"+controllerFunction+"</b> in controller <b>"+controllerFileName+".js</b> is not a function");
				return;
			}
			console.log("routeindex: *, path: "+preq.path, ", controller file: "+file)
			return;
		});
		
		app.listen(port, function () {
		  console.log('App listening on port '+port+'!')
		});
	}
}
module.exports = Sudo;