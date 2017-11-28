var parser = require("body-parser");
var logger = require('morgan');
var express = require('express');
var consign = require('consign');

var app = express();

app.use(parser.urlencoded({extended : true}));
app.use(logger('dev'));

//Consign é um autoload
//Carregar todas as funções que são exportadas dentro de routes, passando o app como parametro
var consign = consign();
consign.include('src/controllers');
consign.include('src/routes').into(app);

module.exports = app;

app.listen(8080, function () {
	console.log('Servidor rodando em http://localhost:%s', 8080);
});