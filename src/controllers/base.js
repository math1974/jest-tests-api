class BaseController {
	bindActions(actions) {
		actions.forEach(action => this[action] = this[action].bind(this));
	}

	errorHandler(error, req, res) {
		res.status(500).json({
			status: 'error',
			code: 500,
			message: error.message || 'Algo de errado ocorreu, por favor, tente novamente.'
		});
	}

	successHandler(data, res) {
		if (data && data.error_key) {
			const response = {
				status: 'error',
				message: 'Ops.. algo de errado aconteceu, tente novamente.'
			};

			if (data.error_key === 'NO_RESULTS') {
				response.code = data.error_key;
			}

			return res.status(200).json(response);
		}

		return res.status(200).json({
			status: 'success',
			data: data
		});
	}
}

export default BaseController;
