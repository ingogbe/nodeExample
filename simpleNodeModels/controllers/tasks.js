module.exports = function (app) {
	var Task = app.models.task

	return {
		index: function (request, response) {
			response.json(Task.all());
		},
		store: function (request, response) {
			Task.save({
				title: request.body.title, //Título da tarefa passado no POST
				status: 0, 
				created_at: new Date() //Data do momento em que o store foi chamado
			});

			response.redirect('/');
		}
	}

}