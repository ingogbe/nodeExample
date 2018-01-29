module.exports = function (app, mongodb, exphbs) {

	var client = mongodb.MongoClient;
	var dbname = "tasklist";
	var url = "mongodb://admin:admin@ds111598.mlab.com:11598/tasklist";

	var taskCollection = {
		name: "tasks",
		validator: {
			$jsonSchema: {
				bsonType: "object",
				required: [ "title", "status_id", "created_at" ],
				properties: {
					title: {
						bsonType: "string",
						description: "must be a string and is required"
					},
					status_id: {
						bsonType: "int",
						enum: [ 1, 2 ],
						description: "can only be one of the enum values and is required"
					},
					created_at: {
						bsonType: "date",
						minimum: 0,
						description: "must be a double and is required"
					}
				}
			}
		}
	}

	var collections = [taskCollection];

	return {
		mongoclient: client,
		mongodbname: dbname,
		mongourl: url,

		init: function(){
			let myConsole = app.utils.myConsole;

			collections.forEach(function (item, indice, array) {
				app.controllers.db.createCollection(item.name, item.validator);
			});
		}
	}
}