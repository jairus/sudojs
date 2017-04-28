var express = require('express');
var bodyParser = require('body-parser');
//Code Igniter inspired framework
var Sudo = require('./system/sudo.js');
var config = require('./application/config/config.js');
var routes = require('./application/config/routes.js');

var app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
var sudo = new Sudo(config, routes, app);