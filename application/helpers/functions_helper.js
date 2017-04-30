help = function(){
	console.log("help");
}
//debug request values
debug = function(dis, callback){
	request(dis, function(ret){
		callback(pre(ret));
	})
}
//put request values in an array
request = function(dis, callback){
	var args = dis.args;
	var res = args.res;
	var req = args.req;
	var route = args.route;
	var ret = {};
	ret["ROUTE"] = route;
	ret["CONTROLLER_FILE_PATH"] = args.controllerFilePath;
	ret["FUNCTION"] = args.controllerFunction;
	ret["METHOD"] = req.method;
	ret["GET"] = req.query;
	//x-www-form-urlencoded
	ret["PUT"] = req.body;
	ret["POST"] = req.body;
	ret["PARAMS"] = req.params;
	var multiparty = require('multiparty');
	var form = new multiparty.Form();
	form.parse(req, function(err, fields, files) {
		// fields fields fields
		ret["multiparty"] = fields;
		callback(ret);
	});
}
print_r = function (obj, indent){
	obj = proper_obj(obj);
	var result = "";
	if (indent == null){ 
		indent = ""
		if(typeof obj =="object"){
			result += "{\n";
			result += print_r(obj, indent + "   ");
			result += "\n}\n";
		}
		else{
			result += typeof(obj)+" : "+obj;
		}
	}
	else{
		for (var property in obj){
			var value = obj[property];
			if (typeof value == 'string')
				value = "'" + value + "'";
			else if (typeof value == 'object'){
				if (value instanceof Array){
					// Just let JS convert the Array to a string!
					value = "[ " + value + " ]";
				}
				else{
					// Recursive dump
					// (replace "  " by "\t" or something else if you prefer)
					var od = print_r(value, indent + "  ");
					// If you like { on the same line as the key
					//value = "{\n" + od + "\n" + indent + "}";
					// If you prefer { and } to be aligned
					value = "\n" + indent + "{\n" + od + "\n" + indent + "}";
				}
			}
			result += indent + "[" + property + "] "+typeof(obj[property])+" : " + value + ",\n";
		}
	}
	return result.replace(/,\n$/, "");
}

pre = function(obj){
	return "<pre>"+print_r(obj)+"</pre>";
}

proper_obj = function(obj){
	obj = JSON.stringify(obj);
	obj = JSON.parse(obj);
	return obj;
}

trim = function(s, mask) {
    while (~mask.indexOf(s[0])) {
        s = s.slice(1);
    }
    while (~mask.indexOf(s[s.length - 1])) {
        s = s.slice(0, -1);
    }
    return s;
}

db_escape = function(str){
	var mysql = require('mysql');
	return trim(mysql.escape(str), "'");
}
