class Main extends Controller{
	constructor(args){
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
		debug(this, function(out){
			res.send(out);
		})
	}
	//wee page
	wee(){
		this.debug.show();
		return;
		
		//buffered printing
		this.print.ob("hello world");
		this.print.send();
		
		//json return printing 
		header('Content-Type', 'application/json');
		var ret = {};
		print(JSON.stringify(ret));
	}
}
//export the class
module.exports = Main;