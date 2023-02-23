import { AuthUtils } from '@utils';

export default class AuthMiddleware {
	static isAuthorized(req, res, next) {
		const errorResponse = {
			status: 'error',
			code: 403,
			message: 'Sessão expirada. Logue novamente no sistema para obter acesso.',
		};

		const token = AuthUtils.getBearerToken(req);
		const decodedToken = AuthUtils.decodeData(token, process.env.APP_SECRET_KEY);

		if (!decodedToken || !decodedToken.user || !decodedToken.user.id) {
			res.status(403).json(errorResponse);

			return;
		}

		req.auth = {
			user_id: decodedToken.user.id,
			company_id: decodedToken.user.log_in
		};

		next();
	}
}
