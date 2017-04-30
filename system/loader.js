class loader{
	constructor(args){
		this.args = args;
		this.route = args.route;
		this.req = args.req;
		this.res = args.res;
	}
	model(name){
		var obj = this.load("models", name);
		if (obj!=false) {
			return obj;
		}
		else{
			this.res.send("Model <b>"+name+".js</b> file not found");
			return false;
		}			
	}
	library(name){
		var obj = this.load("libraries", name);
		if (obj!=false) {
			return obj;
		}
		else{
			this.res.send("Library <b>"+name+".js</b> file not found");
			return false;
		}
	}
	load(folder, name){
		var fs = require('fs');
		var path = require('path');
		name = name.trim();
		var dotjs = ".js";
		var namelen = name.length;
		var last3 = name.substring(name.length-3, name.length);
		if(last3.toLowerCase()!=".js"){
			dotjs = ".js";
		}
		var file = path.dirname(__filename)+'/../application/'+folder+'/'+name+dotjs;
		if (fs.existsSync(file)) {
			var libraryClass = require(file);
			return new libraryClass(this.args);
		}
		else{
			return false;
		}
	}
}
module.exports = loader;