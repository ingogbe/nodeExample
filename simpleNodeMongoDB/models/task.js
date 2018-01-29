var tasks = {
	data: [
		{_id: 1, title: 'Limpar a casa', status: 0, created_at: new Date()},
		{_id: 2, title: 'Lavar o carro', status: 0, created_at: new Date()}
	]
};

function all() {
	return tasks;
}

function save(task) {
	task._id = tasks.data[tasks.data.length - 1]._id + 1;
	tasks.data.push(task);
}

function update(id, task) {
	var index = tasks.data.findIndex(function (task) {
		return task._id == id
	});

	tasks.data[index].title = task.title;
	tasks.data[index].status = task.status;

	return
}

function remove(id) {
	tasks.data = tasks.data.filter(function (task) {
		return task._id != id;
	})

	return
}

//Nosso método find
function find (id) {
	return tasks.data.filter(function (task) {
		return task._id == id
	})[0];
}

//Adicione ele aqui também
module.exports = {all, save, update, remove, find};