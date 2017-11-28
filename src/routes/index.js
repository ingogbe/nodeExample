
var users = require('../controllers/users');

module.exports = function (app) {
	app.get('/helloWorld', function (request, response) {
		response.send('Hello World!');
	});

	app.post("/registerUser", function(request, response) {
		//This prints the JSON document received (if it is a JSON document)
		if (!request.body){
			return response.status(400).send("Bad Request");
		}

		var result = users.registerUser(request.body.name);

		console.log(result);

		if(result != 200){
			return response.status(500).send("Internal Server Error");
		}
		else{
			return response.status(200).send("OK");
		}

	});  
}