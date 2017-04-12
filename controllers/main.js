var Controller = require('../system/base.js');
class Main extends Controller{
	constructor(args){
		super(args);
		//load some models and libraries
		this.main_model = this.load.model("main_model");
		this.main_library = this.load.library("main_library");
		this.debug = this.load.library("debug_library");
		this.print = this.load.library("print_library");
	}
	//default 
	index(){
		var req = this.req;
		var res = this.res;
		this.main_model.hello(); //see in console 'Hello from Main_model'
		this.main_library.hello(); //see in console 'Hello from Main_library'
		var route = this.route;
		this.debug.show();
		return;

		//buffered printing
		this.print.ob("hello world");
		this.print.send();
		
		//json return printing 
		res.setHeader('Content-Type', 'application/json');
		var ret = {};
		res.send(JSON.stringify(ret));
	}
	//wee page
	wee(){
		var req = this.req;
		var res = this.res;
		this.debug.show();
		return;
		
		//buffered printing
		this.print.ob("hello world");
		this.print.send();
		
		//json return printing 
		res.setHeader('Content-Type', 'application/json');
		var ret = {};
		res.send(JSON.stringify(ret));
	}
}
//export the class
module.exports = Main;