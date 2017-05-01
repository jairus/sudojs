//mysql library
class MySQL_library extends SD_Library{
	constructor(args){
		super(args);
	}
	init(db){
		if(db == null) db = "default";
		this.mysql = require('mysql');
		this.Promise = require('promise');
		if(isset(SD.db[db]['hostname'])){
			this.connection = this.mysql.createConnection({
			  host     : SD.db[db]['hostname'],
			  user     : SD.db[db]['username'],
			  password : SD.db[db]['password'],
			  database : SD.db[db]['database']
			});
			this.connection.connect();
		}
	}
	query(sql){
		var prom = new this.Promise(function(resolve, reject){
			this.connection.query(sql, function (err, rows, fields) {
				if (err) throw err
				resolve(proper_obj(rows));
				//this.connection.end();
			}.bind(this));
		}.bind(this));
		return prom;
	}
	escape(str){
		return this.mysql.escape(str);
	}
	end(){
		this.connection.end();
	}
	
}
module.exports = MySQL_library;