class Main extends Controller{
	constructor(args){
		console.log("call super");
		super(args);

		//load some models and libraries
		this.main_model = this.load.model("main_model");
		this.main_library = this.load.library("main_library");
		this.debug = this.load.library("debug_library");
	}
	//default 
	index(){
		var res = this.res;
		var route = this.route;
		this.main_model.hello();
		debug(this, function(out){
			res.send(out);
		});
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