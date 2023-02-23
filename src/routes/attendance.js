import { AttendanceSchema } from '@schemas';
import { AttendanceController } from '@controllers';
import BaseRoutes from './base';

export default class AttendanceRoutes extends BaseRoutes {
	constructor() {
		super();
		this.attendanceController = new AttendanceController();
	}

	setup() {
		this.router.get('/', this.attendanceController.list);
		this.router.get('/:id', this.attendanceController.find);
		this.router.put('/:id', this.attendanceController.update);
		this.router.delete('/:id', this.attendanceController.remove);
		this.router.post('/', this.attendanceController.create);

		return this.router;
	}
}
