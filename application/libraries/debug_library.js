class Debug_library extends SD_Library{
	constructor(args){
		super(args);
	}
	show(){
		var res = this.res;
		var req = this.req;
		var route = this.route;
		var out = "ROUTE: "+route+"<br />";
		out += "CONTROLLER FILE PATH: "+this.args.controllerFilePath+"<br />";
		out += "FUNCTION: "+this.args.controllerFunction+"<br />";
		out += "METHOD: "+this.req.method+"<br />";
		out += "GET: "+JSON.stringify(req.query)+"<br />";
		//x-www-form-urlencoded
		out += "POST: "+JSON.stringify(this.req.body)+"<br />";
		out += "PARAMS: "+JSON.stringify(req.params)+"<br />";
		var multiparty = require('multiparty');
		var form = new multiparty.Form();
		form.parse(req, function(err, fields, files) {
			// fields fields fields
			out += "multiparty: "+fields+"<br />";
			res.send(out);
		});
	}
}
module.exports = Debug_library;