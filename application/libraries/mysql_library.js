//mysql library
class MySQL_library extends Library{
	constructor(args){
		super(args);
		this.mysql = require('mysql');
		this.connection = this.mysql.createConnection({
		  host     : SD.db['default']['hostname'],
		  user     : SD.db['default']['username'],
		  password : SD.db['default']['password'],
		  database : SD.db['default']['database']
		});	
	}
	query(sql, callback){
		this.connection.connect();
		this.connection.query(sql, function (err, rows, fields) {
			if (err) throw err
			callback(proper_obj(rows));
		});
		this.connection.end()
	}
	escape(str){
		return this.mysql.escape(str);
	}
	
}
module.exports = MySQL_library;