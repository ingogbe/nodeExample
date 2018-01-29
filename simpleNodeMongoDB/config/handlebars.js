module.exports = function (app, mongodb, exphbs) {
	var hbs = exphbs.create({
		defaultLayout: 'main',
		extname: '.hbs',
		layoutsDir:'views/layouts/',
		partialsDir: 'views/partials/',
		helpers: {
	        ifCond: function (v1, operator, v2, options) {
			    switch (operator) {
			        case '==':
			            return (v1 == v2) ? options.fn(this) : options.inverse(this);
			        case '===':
			            return (v1 === v2) ? options.fn(this) : options.inverse(this);
			        case '!=':
			            return (v1 != v2) ? options.fn(this) : options.inverse(this);
			        case '!==':
			            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
			        case '<':
			            return (v1 < v2) ? options.fn(this) : options.inverse(this);
			        case '<=':
			            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
			        case '>':
			            return (v1 > v2) ? options.fn(this) : options.inverse(this);
			        case '>=':
			            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
			        case '&&':
			            return (v1 && v2) ? options.fn(this) : options.inverse(this);
			        case '||':
			            return (v1 || v2) ? options.fn(this) : options.inverse(this);
			        default:
			            return options.inverse(this);
			    }
			},

			formatDate: function(date){
				return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " às " + date.getHours() + ":" + date.getMinutes();
			},

			taskCompletePercentage: function(tasks){
				let tasks_completed = 0;

				tasks.forEach(function (item, indice, array) {
					if(item.status_id == 2){
						tasks_completed++;
					}
				});

				if(tasks.length == 0){
					return 0;
				}
				else{
					let percentageComplete = (tasks_completed / tasks.length) * 100;
					return percentageComplete.toFixed(2);
				}
				
			}
	    }
	});

	app.engine('.hbs', hbs.engine);
	app.set('view engine', '.hbs');
}