class Main_library extends Library{
	constructor(args){
		super(args);
	}
	hello(){
		var mysql = require('mysql');
		console.log("Hello from Main_library");
	}
}
//export the class
module.exports = Main_library;