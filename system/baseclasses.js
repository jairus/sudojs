//Controller Base Class
class Controller{
	constructor(args){
		//put args as class properties
		this.args = args;
		this.route = args.route;
		this.req = args.req;
		this.res = args.res;
		this.load = args.load; //loader object
	}
}
//export the class
module.exports = Controller;

//Model Base Class
class Model{
	constructor(args){
		//put args as class properties
		this.args = args;
		this.route = args.route;
		this.req = args.req;
		this.res = args.res;
		this.load = args.load; //loader object
	}
}
//export the class
module.exports = Model;

//Library Base Class
class Library{
	constructor(args){
		//put args as class properties
		this.args = args;
		this.route = args.route;
		this.req = args.req;
		this.res = args.res;
		this.load = args.load; //loader object
	}
}
//export the class
module.exports = Library;
