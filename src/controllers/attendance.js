import BaseController from './base';
import { AttendanceService } from '@services';
import { pick } from 'lodash';

class AttendanceController extends BaseController {
	constructor() {
		super();

		this.attendanceService = new AttendanceService();

		this.bindActions(['list', 'find', 'create', 'update', 'remove']);
	}

	async list(req, res) {
		try {
			const attendances = await this.attendanceService.list({
				filter: {
					company_id: req.auth.company_id,
					...pick(req.filter, ['start_date', 'end_date'])
				},
				meta: {
					page: req.query.page,
					per_page: req.query.per_page
				}
			});

			this.successHandler(attendances, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	}

	async find(req, res) {
		try {
			const attendance = await this.attendanceService.find({
				filter: {
					id: req.filter.id,
					company_id: req.auth.company_id
				}
			});

			this.successHandler(attendance, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	}

	async create(req, res) {
		try {
			const attendance = await this.attendanceService.create({
				...req.data,
				company_id: req.filter.company_id,
				creator_id: req.filter.logged_user_id
			});

			this.successHandler(attendance, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	}

	async update(req, res) {
		try {
			await this.attendanceService.update({
				changes: {
					...req.data
				},
				filter: req.filter
			});

			this.successHandler(true, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	}

	async remove(req, res) {
		try {
			await this.attendanceService.update({
				changes: {
					is_deleted: true,
					destroyer_id: req.filter.logged_user_id
				},
				filter: req.filter
			});

			this.successHandler(true, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	}
}

export default AttendanceController;
