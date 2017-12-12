module.exports = function (app) {
	var Task = app.models.task

	return {
		index: function (request, response) {
			response.json(Task.all());
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
		}
	}

}