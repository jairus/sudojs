var Model = require('../../system/base.js');
class Main_model extends Model{
	constructor(args){
		super(args);
	}
	hello(){
		var mysql = require('mysql');
		console.log("Hello from Main_model");
	}
}
//export the class
module.exports = Main_model;