import * as yup from 'yup';
import moment from 'moment';
import { sanitizeValue } from './utils';

const schema = {
	create: {
		body: yup.object({
			type: yup.string().test('invalidFormat', null, value => ['ATTENDANCE', 'PROCEDURE'].includes(value)),
		}).noUnknown()
	},
	find: {
		params: yup.object({
			id: yup.number().required()
		})
	}
};

export default {
	list: {
		query: yup.object({
			start_date: yup.string().transform(sanitizeValue).test('invalidFormat', null, value => !value || moment(value, 'YYYY-MM-DD').isValid()),
			end_date: yup.string().test('invalidFormat', null, value => !value || moment(value, 'YYYY-MM-DD').isValid()),
			page: yup.number().required(),
			per_page: yup.number().required()
		}).noUnknown()
	},
	find: schema.find,
	remove: schema.find,
	create: schema.create,
	update: {
		params: schema.find.params,
		body: schema.create.body
	}
};
