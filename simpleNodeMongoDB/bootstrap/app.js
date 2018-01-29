var logger = require('morgan');
var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var mongodb = require('mongodb');

var app = express();

app.use(logger('dev'));

app.use(bodyParser.urlencoded({
	extended: true
}));

consign()
	.include('config')
	.then('utils')
	.then('models')
	.then('controllers')
	.then('routes')
	.into(app, mongodb, exphbs);

module.exports = app;

var port = process.env.PORT || 3000;

app.listen(port, function () {
   
    app.config.db.init();
    //app.controllers.db.createCollection("status");
	//app.controllers.db.dropCollection("status");
	console.log('Servidor rodando em http://localhost:%s', port);

});








