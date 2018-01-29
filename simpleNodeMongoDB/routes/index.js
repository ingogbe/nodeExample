module.exports = function (app, mongodb, exphbs) {
	app.get('/', app.controllers.tasks.index);
	app.post('/', app.controllers.tasks.store);
	app.post('/task/:id', app.controllers.tasks.update);
	app.get('/task/:id', app.controllers.tasks.destroy);
	app.get('/create', app.controllers.tasks.create);
	app.get('/edit/:id', app.controllers.tasks.edit);
	app.get('/completeTask', app.controllers.tasks.completeAll);
	app.get('/completeTask/:id', app.controllers.tasks.completeTask);
	app.get('/deleteAll', app.controllers.tasks.deleteAll);
}