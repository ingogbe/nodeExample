var logger = require('morgan');
var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var hbs = require('express-handlebars');

var app = express();

app.use(logger('dev'));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.engine('.hbs', hbs({
	defaultLayout: 'main',
	extname: '.hbs'
}));

app.set('view engine', '.hbs');

consign()
	.include('models')
	.then('controllers')
	.then('routes')
	.into(app);

module.exports = app;

var port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log('Servidor rodando em http://localhost:%s', port);
});