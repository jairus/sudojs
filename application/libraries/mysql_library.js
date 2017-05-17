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
			/*
			//the connect call dont seem to be needed at all
			//connect() is just causing crash
			try{
				var sqlConnect = function(){
					this.connection.connect(function(err) {
						if(err) {                                     // or restarting (takes a while sometimes).
							SD.log('error when connecting to db:'+err);
							setTimeout(sqlConnect, 2000); // We introduce a delay before attempting to reconnect,
						}  
					});
				}.bind(this);
				sqlConnect();
			}
			catch(e){
				SD.log(e);	
			}
			*/
		}
	}
	query(sql){
		var promise = require('promise');
		var prom = new promise(function(resolve, reject){
			this.connection.query(sql, function (err, rows, fields) {		
				if(isset(err)){
					var e = {};
					e['sql'] = sql;
					e['err'] = err;
					SD.log(e);					
					reject(proper_obj(e));
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