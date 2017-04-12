//author: Jairus Bondoc
//class: Sudo
//description: Code Igniter inspired class to load controllers from routes array config
class Sudo{
	constructor(config, routes, app){
		var port = config['port'];
		var routeindex;
		var controllers = {};
		var fs = require('fs');
		var path = require('path');
		var loader = require('./loader.js');
		for(routeindex in routes){
			if(routeindex!="*"){
				var cbBind = {};
				cbBind.routeindex = routeindex;
				var controllerArr = routes[routeindex];
				controllerArr = controllerArr.split("/");
				cbBind.controllerArr = controllerArr;
				app.all(routeindex, function (req, res) {
					var routeindex = this.routeindex;
					var controller = controllers[this.routeindex];	
					var controllerArr = this.controllerArr;
					var controllerFileName = controllerArr[0];					
					var controllerFunction = controllerArr[1];
					var file = path.dirname(__filename)+'/../controllers/'+controllerFileName+'.js';
					//check if controller file exists
					if (fs.existsSync(file)) {
						var controllerClass = require(file);
					}
					else{
						res.send("Controller <b>"+controllerFileName+".js</b> file not found");
						return;
					}
					if(typeof(controllerFunction)=="undefined"||controllerFunction==""){
						controllerFunction = "index"; //use index as the default method
					}
					var args = {};
					args.controllerFilePath = file;
					args.controllerFunction = controllerFunction;
					args.route = routeindex;
					args.req = req;
					args.res = res;
					//loader object
					args.load = (new loader(args));
					controller = new controllerClass(args);
					if(typeof(controller)=="undefined"){
						res.send("<b>"+controllerFileName+"</b> not found");
					}
					else{
						if(typeof(controller[controllerFunction])=="function"){
							var funcargs = [];
							var param;
							var n = 0;
							for(param in req.params){
								funcargs[n] = req.params[param];
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
							res.send("<b>"+controllerFunction+"</b> in controller <b>"+controllerFileName+".js</b> is not a function");
						}
					}
					return;
				}.bind(cbBind));
			}
		}
		app.all("*", function (req, res) {
			var routeindex = req.path;
			var controllerArr = routes[routeindex];
			if(typeof(controllerArr)=="undefined"){
				controllerArr = routeindex;
				controllerArr = controllerArr.substring(1, controllerArr.length);
			}
			controllerArr = controllerArr.split("/");
			var controllerFileName = controllerArr[0];
			var controllerFunction = controllerArr[1];
			
			var file = path.dirname(__filename)+'/../controllers/'+controllerFileName+'.js';
			//check if controller file exists
			if (fs.existsSync(file)) {
				var controllerClass = require(file);
			}
			else{
				routeindex = "*";
				if(controllerFileName==""){ //if web root
					res.send("Route for / not found");
				}
				//catch all
				else if(typeof(routes[routeindex])=="undefined"){
					res.send("Route for * not found");
					return;
				}
				controllerArr = routes[routeindex];
				controllerArr = controllerArr.split("/");
				controllerFileName = controllerArr[0];
				controllerFunction = controllerArr[1];
				file = path.dirname(__filename)+'/../controllers/'+controllerFileName+'.js';
				//check if controller file exists
				if (fs.existsSync(file)) {
					var controllerClass = require(file);
				}
				else{
					res.send("Controller <b>"+controllerFileName+".js</b> file not found");
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
			args.req = req;
			args.res = res;
			//loader object
			args.load = (new loader(args));
			var controller = new controllerClass(args);
			if(typeof(controller[controllerFunction])=="function"){
				var funcargs = [];
				for(var i=2; i<controllerArr.length; i++){
					funcargs.push(controllerArr[i]);
				}
				controller[controllerFunction](funcargs);
			}
			else{
				res.send("<b>"+controllerFunction+"</b> in controller <b>"+controllerFileName+".js</b> is not a function");
			}
			return;
		});
		
		app.listen(port, function () {
		  console.log('App listening on port '+port+'!')
		});
	}
}
module.exports = Sudo;