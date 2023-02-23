import { verify } from 'jsonwebtoken';

import { config } from '../config/config';

export default class AuthUtils {
	static sum(a, b) {
		return a + b;
	}

	static decodeData(token, secretKey) {
		try {
			return verify(token, secretKey || config.app_secret_key);
		} catch (err) {
			return null;
		}
	}

	static getBearerToken(req) {
		const authorization = (req.headers.authorization || '');
		const [, token] = authorization.split(' ');

		return token;
	}
}
