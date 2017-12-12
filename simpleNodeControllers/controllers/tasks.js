function index (request, response) {
	response.json({
		data: [
			{_id: 1, title: 'Limpar a casa', status: 0, created_at: new Date()},
			{_id: 2, title: 'Lavar o carro', status: 0, created_at: new Date()}
		]
	});
}

module.exports = {index}