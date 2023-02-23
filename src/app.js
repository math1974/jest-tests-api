import cors from 'cors';
import http from 'http';
import helmet from 'helmet';
import dotenv from 'dotenv';
import express from 'express';

import Routes from './config/routes.js';
class App {
	constructor() {
		dotenv.config({ path: `${__dirname}/../.env` });

		this.app = express();
		this.port = process.env.PORT || '3000';
		this.httpServer = http.createServer(this.app);
	}

	async setup() {
		const routes = new Routes();

		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: false }));
		this.app.use(cors());
		this.app.use(helmet());

		this.app.use(routes.setup());
		this.app.use((error, req, res, next) => {
			if (error) {
				res.status(500).json({
					status: 'error',
					code: 500,
					message: 'Algo de errado aconteceu'
				});
				return;
			}

			next();
		});
	}

	async start() {
		this.httpServer.listen(this.port, () => {
			console.log(`Server running port ${this.port}`);

			this.setup();
		});
	}
}

export default App;
