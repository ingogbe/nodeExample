module.exports = function (app) {
	var Task = app.models.task;

	return {
		index: function (request, response) {
			let tasks = Task.all();

			response.format({
				json: function () {
					return response.json(tasks);
				},
				html: function () {
					return response.render('home', {tasks: tasks.data});
				}
			});
		},
		store: function (request, response) {
			Task.save({
				title: request.body.title,
				status: 0, 
				created_at: new Date()
			});

			response.redirect('/');
		},
		update: function (request, response) {
			var id = request.params.id;

			var task = request.body;

			Task.update(id, task);

			response.redirect('/');
		},
		destroy: function (request, response) {
			Task.remove(request.params.id);
			response.redirect('/');
		},
		create: function (request, response) {
			response.render('createform', {
				action: '/',
				title: 'Nova Tarefa'
			});
		},
		//Nosso método EDIT
		edit: function (request, response) {
			var task = Task.find(request.params.id);

			response.render('createform', {
				task: task,
				title: 'Editar',
				action: '/task/' + request.params.id,
			});
		}

	}

}