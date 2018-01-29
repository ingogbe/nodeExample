module.exports = function (app, mongodb, exphbs) {
	var Task = app.models.task;
	var myConsole = app.utils.myConsole;

	return {
		index: function (request, response) {
			app.controllers.db.find("tasks", {}, {}, function(err, result) {
				if (err) {
					myConsole.logError("MongoDB", "index", err);
					response.redirect('/');
				}
				else{
					if(result){
						myConsole.logSuccess("MongoDB", "index", result.length + " Document(s) found! ");

						result.forEach(function (item, indice, array) {
							myConsole.log("MongoDB", "index", indice + " - " + JSON.stringify(item));
						});

						response.format({
							json: function () {
								return response.json(result);
							},
							html: function () {
								return response.render('home', {tasks: result});
							}
						});
					}
					else{
						myConsole.logError("MongoDB", "index", "Unknown error!");
						response.redirect('/');
					}
				}

			});
		},
		store: function (request, response) {

			if(Array.isArray(request.body.title)){
				var taskArray = [];

				request.body.title.forEach(function (item, indice, array) {

					//Se não passar na validação do front a validação do back dá um Bad Request
					if(!item){
						response.status(400);
						return response.render('error', {
							status: '400',
							message: 'Bad Request'
						});
					}

					let task = {
						title: item,
						status_id: 1, 
						created_at: new Date()
					}

					taskArray.push(task);
				});

				app.controllers.db.insertMany("tasks", taskArray, function(err, obj) {
					if (err) {
						myConsole.logError("MongoDB", "insertMany", err);
					}
					else{
						if(obj){
							myConsole.logSuccess("MongoDB", "insertMany", "Documents inserted! " + JSON.stringify(obj.result));
							taskArray.forEach(function (item, indice, array) {
								myConsole.log("MongoDB", "insertMany", indice + " - " + JSON.stringify(item));
							});
						}
						else{
							myConsole.logError("MongoDB", "insertMany", "Unknown error!");
						}
					}

					return response.redirect('/');
				});
			}
			else{
				
				//Se não passar na validação do front a validação do back dá um Bad Request
				if(!request.body.title){
					response.status(400);
					return response.render('error', {
						status: '400',
						message: 'Bad Request'
					});
				}
				

				var task = {
					title: request.body.title,
					status_id: 1, 
					created_at: new Date()
				}

				app.controllers.db.insertOne("tasks", task, function(err, result) {
					if (err) {
						myConsole.logError("MongoDB", "store", err);
					}
					else{
						if(result){
							myConsole.logSuccess("MongoDB", "store", "Document inserted! " + result);
						}
						else{
							myConsole.logError("MongoDB", "store", "Unknown error!");
						}
					}

					return response.redirect('/');
				});
			}

			
		},
		update: function (request, response) {
			var id = mongodb.ObjectId(request.params.id);
			var task = request.body;

			if(!task.status_id){
				task.status_id = 1;
			}
			else{
				task.status_id = 2;
			}

			app.controllers.db.updateOne("tasks", {_id: id}, {$set: task}, function(err, obj) {
				if (err) {
					myConsole.logError("MongoDB", "update", err);
				}
				else{
					if(obj){
						myConsole.logSuccess("MongoDB", "update", obj.modifiedCount + " Document updated!");
						myConsole.log("MongoDB", "update", JSON.stringify(obj.result));
					}
					else{
						myConsole.logError("MongoDB", "update", "Unknown error!");
					}
				}

				response.redirect('/');
			});
			
		},
		destroy: function (request, response) {
			var query = {
				_id: mongodb.ObjectId(request.params.id)
			}

			app.controllers.db.deleteOne("tasks", query, function(err, result) {
				if (err) {
					myConsole.logError("MongoDB", "destroy", err);
				}
				else{
					if(result){
						myConsole.logSuccess("MongoDB", "destroy", result.deletedCount + " Document deleted!");
						myConsole.log("MongoDB", "destroy", result);
					}
					else{
						myConsole.logError("MongoDB", "destroy", "Unknown error!");
					}
				}

				response.redirect('/');
			});
			
		},
		create: function (request, response) {
			return response.render('createform', {
				action: '/',
				title: 'Nova Tarefa'
			});
		},
		//Nosso método EDIT
		edit: function (request, response) {

			var query = {
				_id: mongodb.ObjectId(request.params.id) //parseInt(, 16)
			};

			app.controllers.db.findOne("tasks", query, function(err, result) {
				if (err) {
					myConsole.logError("MongoDB", "edit", err);
					response.redirect('/');
				}
				else{
					if(result){
						myConsole.logSuccess("MongoDB", "edit", "Document found! ");
						myConsole.log("MongoDB", "edit", JSON.stringify(result));

						response.render('createform', {
							task: result,
							title: 'Editar',
							action: '/task/' + request.params.id,
						});
					}
					else{
						myConsole.logError("MongoDB", "edit", "Unknown error!");
						response.redirect('/');
					}
				}
			});
		},

		completeAll: function(request, response){
			app.controllers.db.updateMany("tasks", {status_id: 1}, {$set: {status_id: 2}}, function(err, obj) {
				if (err) {
					myConsole.logError("MongoDB", "completeAll", err);
				}
				else{
					if(obj){
						myConsole.logSuccess("MongoDB", "completeAll", obj.modifiedCount + " Document(s) updated!");
						myConsole.log("MongoDB", "completeAll", JSON.stringify(obj.result));
					}
					else{
						myConsole.logError("MongoDB", "completeAll", "Unknown error!");
					}
				}

				response.redirect('/');
			});
		},

		completeTask: function (request, response) {
			var id = mongodb.ObjectId(request.params.id);

			app.controllers.db.updateOne("tasks", {_id: id}, {$set: {status_id: 2}}, function(err, obj) {
				if (err) {
					myConsole.logError("MongoDB", "update", err);
				}
				else{
					if(obj){
						myConsole.logSuccess("MongoDB", "update", obj.modifiedCount + " Document updated!");
						myConsole.log("MongoDB", "update", JSON.stringify(obj.result));
					}
					else{
						myConsole.logError("MongoDB", "update", "Unknown error!");
					}
				}

				response.redirect('/');
			});
			
		},

		deleteAll: function(request, response){
			app.controllers.db.deleteMany("tasks", {}, function(err, obj) {
				if (err) {
					myConsole.logError("MongoDB", "deleteAll", err);
				}
				else{
					if(obj){
						myConsole.logSuccess("MongoDB", "deleteAll", obj.deletedCount + " Document deleted!");
						myConsole.log("MongoDB", "deleteAll", JSON.stringify(obj.result));
					}
					else{
						myConsole.logError("MongoDB", "deleteAll", "Unknown error!");
					}
				}

				response.redirect('/');
			});
		}
	}
}