module.exports = function (app) {
	app.get('/', app.controllers.tasks.index)
}