import { CurrencyUtils } from '@utils';

test('sum the values given', () => {
	const number1 = 8;
	const number2 = 2;

	const sum = CurrencyUtils.sum(number1, number2);

	expect(sum).toBe(10);
})
