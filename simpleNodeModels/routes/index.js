module.exports = function (app) {
	app.get('/', app.controllers.tasks.index);
	app.post('/', app.controllers.tasks.store);
}