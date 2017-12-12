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
	//Pegamos o índice da última tarefa somado com um, para criar o índice da nova tarefa.
	task._id = tasks.data[tasks.data.length - 1]._id + 1;

	//Adicionamos a nova task a nossa lista de tasks
	tasks.data.push(task);
}

module.exports = {all, save};