class Sub extends SD_Controller{
	constructor(args){
		super(args);
	}
	//default 
	index(){
		var req = this.req;
		var res = this.res;
		res.send("Sub Index!");
	}
	hello(){
		var req = this.args.req;
		var res = this.args.res;
		res.send("Hello!");
	}
	ola(args){
		var req = this.args.req;
		var res = this.args.res;
		header('Content-Type', 'application/json');
		res.send(JSON.stringify(args));
	}
}
//export the class
module.exports = Sub;