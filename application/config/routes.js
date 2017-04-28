var routes = {};
routes['/wee'] = "main/wee";
routes['/wee/:var1'] = "main/wee";
routes['/wee/:var1/:var2'] = "main/wee";
routes['/main/waka'] = "main/wee"
routes['/main/waka/:var'] = "main/wee"
routes['/'] = "main"; //default controller
//catch all 
routes['*'] = "main"; 
module.exports = routes;