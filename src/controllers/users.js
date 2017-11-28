
var connection = require('../controllers/connection');

function registerUser(name){
	var con = connection.createConnection();

	con.connect(function(err) {
		if (err){
			return err;
		}

		console.log("Connected!");
		var sql = "INSERT INTO users (name) VALUES ('"+ name +"')";

		con.query(sql, function (err, result) {
			if (err){
				return err;
			}
			
			return 200;
		});
	});
}

module.exports = {registerUser}