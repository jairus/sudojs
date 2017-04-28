class Print_library extends Library{
	constructor(args){
		super(args);
	}
	ob(str){
		this.out += str;
	}
	getob(){
		return this.out;
	}
	send(str){
		res.send(this.out+str);
	}
}
module.exports = Print_library;