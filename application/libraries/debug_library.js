class Debug_library extends SD_Library{
	constructor(args){
		super(args);
	}
	show(){
		var res = this.res;
		var req = this.req;
		var route = this.route;
		
		var ret = {};
		
		ret["ROUTE"] = route;
		ret["CONTROLLER FILE PATH"] = this.args.controllerFilePath;
		ret["FUNCTION"] = this.args.controllerFunction;
		ret["METHOD"] = this.req.method;
		ret["GET"] = JSON.stringify(req.query);
		//x-www-form-urlencoded
		ret["POST"] = JSON.stringify(this.req.body);
		ret["PARAMS"] = JSON.stringify(req.params);
		var multiparty = require('multiparty');
		var form = new multiparty.Form();
		form.parse(req, function(err, fields, files) {
			// fields fields fields
			ret["multiparty"] = fields;
			res.send(pre(ret));
		});
	}
}
module.exports = Debug_library;