//global req and res variables
req = "";
res = "";
//sudojs container for globals
sudojs = {};
sudojs.out = ""; //output buffer
//global functions
//function to use instead of res.send 
print = function(str){
	sudojs.out += str;
};
//function to use instead of res.send 
echo = function(str){
	sudojs.out += str;
};
//output buffer end
psend = function(){
	res.send(sudojs.out);
	sudojs.out = "";
};
header = function(key, value){
	res.setHeader(key, value);
}