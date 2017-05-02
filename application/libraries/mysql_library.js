//mysql library
class MySQL_library extends SD_Library{
	constructor(args){
		super(args);
	}
	init(db){
		if(db == null) db = "default";
		this.mysql = require('mysql');
		if(isset(SD.db[db]['hostname'])){
			this.connection = this.mysql.createConnection({
			  host     : SD.db[db]['hostname'],
			  user     : SD.db[db]['username'],
			  password : SD.db[db]['password'],
			  database : SD.db[db]['database']
			});
			try{
				this.connection.connect();
			}
			catch(e){
			
			}
		}
	}
	query(sql){
		var promise = require('promise');
		var prom = new promise(function(resolve, reject){
			this.connection.query(sql, function (err, rows, fields) {		
				if(isset(err)){
					SD.log(err);
					reject(proper_obj(err));
				}
				else{
					resolve(proper_obj(rows));
				}
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