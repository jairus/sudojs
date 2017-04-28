help = function(){
	console.log("help");
}

debug = function(args, callback){
	var res = args.res;
	var req = args.req;
	var route = args.route;
	var out = "ROUTE: "+route+"<br />";
	out += "CONTROLLER FILE PATH: "+args.args.controllerFilePath+"<br />";
	out += "FUNCTION: "+args.args.controllerFunction+"<br />";
	out += "METHOD: "+args.req.method+"<br />";
	out += "GET: "+JSON.stringify(req.query)+"<br />";
	//x-www-form-urlencoded
	out += "POST: "+JSON.stringify(args.req.body)+"<br />";
	out += "PARAMS: "+JSON.stringify(req.params)+"<br />";
	var multiparty = require('multiparty');
	var form = new multiparty.Form();
	form.parse(req, function(err, fields, files) {
		// fields fields fields
		out += "multiparty: "+fields+"<br />";
		callback(out);
	});
}