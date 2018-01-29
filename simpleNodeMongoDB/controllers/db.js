module.exports = function (app, mongodb, exphbs) {
	var dbConfig = app.config.db;
	var myConsole = app.utils.myConsole;

	return {
		createCollection: function (collectionName) {
			dbConfig.mongoclient.connect(dbConfig.mongourl, function(err, db) {
				if (err) {
					myConsole.logError("MongoDB", "createCollection", err);
					db.close();
				}
				else{
					var dbo = db.db(dbConfig.mongodbname);
					dbo.createCollection(collectionName, function(err, result) {
						if (err) {
							myConsole.logError("MongoDB", "createCollection", err);
						}
						else{
							if(result){
								myConsole.logSuccess("MongoDB", "createCollection", "Collection created if no exists! " + collectionName);
							}
							else{
								myConsole.logError("MongoDB", "createCollection", "Unknown error!");
							}
						}

						db.close();
					});
				}
			});
		},

		dropCollection: function(collectionName){
			dbConfig.mongoclient.connect(dbConfig.mongourl, function(err, db) {
				if (err) {
					myConsole.logError("MongoDB", "dropCollection", err);
					db.close();
				}
				else{
					var dbo = db.db(dbConfig.mongodbname);

					dbo.collection(collectionName).drop(function(err, dropOK) {
						if (err) {
							myConsole.logError("MongoDB", "dropCollection", err);
						}
						else {
							if (dropOK){
								myConsole.logSuccess("MongoDB", "dropCollection", "Collection '"+ collectionName +"' deleted!");
							}
							else{
								myConsole.logError("MongoDB", "dropCollection", "Unknown error!");
							}
						}

						db.close();
					});
				}
			});
		},

		insertOne: function (collectionName, obj, handler){
			dbConfig.mongoclient.connect(dbConfig.mongourl, function(err, db) {
				if (err) {
					myConsole.logError("MongoDB", "insertOne", err);
					db.close();
				}
				else{
					var dbo = db.db(dbConfig.mongodbname);
					dbo.collection(collectionName).insertOne(obj, handler);
					db.close();

				}
			});
		},

		insertMany: function (collectionName, objArray, handler){
			dbConfig.mongoclient.connect(dbConfig.mongourl, function(err, db) {
				if (err) {
					myConsole.logError("MongoDB", "insertMany", err);
					db.close();
				}
				else{
					var dbo = db.db(dbConfig.mongodbname);

					dbo.collection(collectionName).insertMany(objArray, handler);
				}

				db.close();
			});
		},

		findOne: function(collectionName, query, handler){
			dbConfig.mongoclient.connect(dbConfig.mongourl, function(err, db) {
				if (err) {
					myConsole.logError("MongoDB", "findOne", err);
					db.close();
				}
				else{
					var dbo = db.db(dbConfig.mongodbname);
					dbo.collection(collectionName).findOne(query, handler);
					db.close();
				}
			});
		},

		find: function(collectionName, query, projection, handler){
			dbConfig.mongoclient.connect(dbConfig.mongourl, function(err, db) {
				if (err) {
					myConsole.logError("MongoDB", "find", err);
					db.close();
				}
				else{
					var dbo = db.db(dbConfig.mongodbname);
					dbo.collection(collectionName).find(query).project(projection).toArray(handler);
					db.close();
				}
			});
		},

		deleteOne: function(collectionName, queryParameters, handler){
			dbConfig.mongoclient.connect(dbConfig.mongourl, function(err, db) {
				if (err) {
					myConsole.logError("MongoDB", "deleteOne", err);
					db.close();
				}
				else{
					var dbo = db.db(dbConfig.mongodbname);
					dbo.collection(collectionName).deleteOne(queryParameters, handler);
					db.close();
				}
			});
		},

		deleteMany: function(collectionName, queryParameters, handler){
			dbConfig.mongoclient.connect(dbConfig.mongourl, function(err, db) {
				if (err) {
					myConsole.logError("MongoDB", "deleteMany", err);
					db.close();
				}
				else{
					var dbo = db.db(dbConfig.mongodbname);
					dbo.collection(collectionName).deleteMany(queryParameters, handler);
					db.close();
				}
			});
		},

		updateOne: function(collectionName, queryParameters, newValues, handler){
			dbConfig.mongoclient.connect(dbConfig.mongourl, function(err, db) {
				if (err) {
					myConsole.logError("MongoDB", "updateOne", err);
					db.close();
				}
				else{
					var dbo = db.db(dbConfig.mongodbname);
					dbo.collection(collectionName).updateOne(queryParameters, newValues, handler);
					db.close();
				}
			});
		},

		updateMany: function(collectionName, queryParameters, newValues, handler){
			dbConfig.mongoclient.connect(dbConfig.mongourl, function(err, db) {
				if (err) {
					myConsole.logError("MongoDB", "updateMany", err);
					db.close();
				}
				else{
					var dbo = db.db(dbConfig.mongodbname);
					dbo.collection(collectionName).updateMany(queryParameters, newValues, handler);
					db.close();
				}
			});
		}

	}

}

