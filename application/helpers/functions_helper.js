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
		indent = "";
		if (obj instanceof Array){
			result = "\n"+indent+"[\n" + print_r(obj, indent + "    ") + "\n"+indent+"]";
		}
		else if(typeof obj =="object"){
			result += "{\n";
			result += print_r(obj, indent + "    ");
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
					value = "\n"+indent+"[\n" + print_r(value, indent + "    ") + "\n"+indent+"]";
				}
				else{
					// Recursive dump
					// (replace "  " by "\t" or something else if you prefer)
					var od = print_r(value, indent + "    ");
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
	var objr = JSON.stringify(obj);
	objr = JSON.parse(objr);
	return objr;
}

trim = function(s, mask, iteration) {
	if(!isset(mask)){
		return s.trim();
	}
	n = 0;
    while (~mask.indexOf(s[0])) {
        s = s.slice(1);
		n++;
		if(isset(iteration)){
			if(n>=iteration){
				break;
			}
		}
    }
	n = 0;
    while (~mask.indexOf(s[s.length - 1])) {
        s = s.slice(0, -1);
		n++;
		if(isset(iteration)){
			if(n>=iteration){
				break;
			}
		}
    }
    return s;
}



db_escape = function(str){
	var mysql = require('mysql');
	return trim(mysql.escape(str), "'", 1);
}

isset = function(v, strict){
	//not strict
	if(typeof strict == "undefined" || strict==""){
		if(typeof v == "undefined"){
			return false;
		}
		else if(v == ""){
			return false;
		}
		else if(v == false){
			return false;
		}
		else if(v == 0){
			return false;
		}
		else if(v == null){
			return false;
		}
		else if(!v){
			return false;
		}
		else{
			return true;
		}
	}
	//strict
	else{
		if(typeof v == "undefined"){
			return false;
		}
		else{
			return true;
		}
	}
}

