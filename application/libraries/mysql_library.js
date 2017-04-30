//mysql library
class MySQL_library extends SD_Library{
	constructor(args){
		super(args);
	}
	init(db){
		if(db == null) db = "default";
		this.mysql = require('mysql');
		this.connection = this.mysql.createConnection({
		  host     : SD.db[db]['hostname'],
		  user     : SD.db[db]['username'],
		  password : SD.db[db]['password'],
		  database : SD.db[db]['database']
		});
	}
	query(sql, callback){
		this.connection.connect();	
		this.connection.query(sql, function (err, rows, fields) {
			if (err) throw err
			callback(proper_obj(rows));
			this.connection.end();
		}.bind(this));
	}
	escape(str){
		return this.mysql.escape(str);
	}
	
}
module.exports = MySQL_library;