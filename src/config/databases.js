import fs from 'fs';
import Sequelize from 'sequelize';
import { config } from './config';

class Database {
	constructor() {
		this.models = {};
		this.databaseOptions = {
			dialect: 'postgres',
			port: process.env.DB_PORT || 5432,
			logging: false,
			minifyAliases: true,
			query: {
				raw: true
			},
			replication: {
				read: config.database.read,
				write: config.database.master
			}
		};

		this._instance = new Sequelize(config.database.dbname, null, null, this.databaseOptions);
	}

	_loadModels() {
		fs.readdirSync(`${__dirname}/../models`, { withFileTypes: true })
			.filter(entry => fs.statSync(`${__dirname}/../models/${entry.name}`).isFile())
			.map(entry => `${__dirname}/../models/${entry.name}`)
			.forEach(filePath => {
				const Model = require(filePath).default;

				if (!Model || Model.name === 'BaseModel') {
					return;
				}

				this.models[Model.name] = Model.load(this._instance, Sequelize);
			});
	}

	_instantiateModels() {
		Object.values(this.models)
			.filter(model => typeof model.associate === 'function')
			.forEach(model => {
				model.models = this.models;
				model.sequelize = this._instance;
				model.associate(this.models);
			});
	}

	_authenticate() {
		return this._instance.authenticate()
			.then(() => Logger.success('Database is connected'))
			.catch(error => {
				Logger.error(`Database connection error: ${error}`);
				throw error;
			});
	}

	disconnect() {
		return this._instance.close()
			.then(() => Logger.success('Database is disconnected'))
			.catch(error => Logger.error(`Database disconnection error: ${error}`));
	}

	connect() {
		this._loadModels();
		this._instantiateModels();

		return this._authenticate();
	}
}

export default Database;
