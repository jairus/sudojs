class Main extends SD_Controller{
	constructor(args){
		super(args);
		//load some models and libraries
		this.main_model = this.load.model("main_model");
		this.main_library = this.load.library("main_library");
		this.db = this.load.library("mysql_library");
		this.db.init("default");
	}
	//default 
	index(){
		var res = this.res;
		var route = this.route;
		this.main_model.hello();
		request(this, function(ret){
			var out = "";
			out += pre(ret);
			var sql = "select UNIX_TIMESTAMP() as `timestamp`";
			out += sql;
			this.db.query(sql,  function(rows){
				out += pre(rows);
				res.send(out);
			});
			
		}.bind(this));
	}
	//wee page
	wee(){
		var res = this.res;
		var route = this.route;
		debug(this, function(out){
			res.send(out);
		});
		return; 
				
		//json return printing 
		res.setHeader('Content-Type', 'application/json');;
		var ret = {};
		res.send(JSON.stringify(ret));
	}
}
//export the class
module.exports = Main;