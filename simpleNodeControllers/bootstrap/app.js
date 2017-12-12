var logger = require('morgan');
var express = require('express');
var consign = require('consign');

var app = express();

app.use(logger('dev'));

consign()
	.include('controllers')
	.then('routes')
	.into(app);

module.exports = app;

var port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log('Servidor rodando em http://localhost:%s', port);
});