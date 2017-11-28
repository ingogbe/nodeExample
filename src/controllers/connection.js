
var mysql = require('mysql');

function createConnection(){
	//Criar conexão com o BD
	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "",
		database: "nodetests"
	});

	return con;
}

module.exports = {createConnection}