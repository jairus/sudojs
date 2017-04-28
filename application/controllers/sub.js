class Sub extends Controller{
	constructor(args){
		super(args);
	}
	//default 
	index(){
		var req = this.req;
		var res = this.res;
		print("Sub Index!");
	}
	hello(){
		var req = this.args.req;
		var res = this.args.res;
		print("Hello!");
	}
	ola(args){
		var req = this.args.req;
		var res = this.args.res;
		header('Content-Type', 'application/json');
		print(JSON.stringify(args));
	}
}
//export the class
module.exports = Sub;