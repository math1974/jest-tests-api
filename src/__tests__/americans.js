const filterAmericanPatients = list => {
	if (!list) {
		return []
	};

	return list?.filter(patient => patient.country === 'USA');
};

test('filter USA patients', () => {
	const patients = [{
		id: 1,
		name: 'matheus',
		country: 'USA'
	}, {
		id: 3,
		name: 'fernando',
		country: 'BR'
	}, {
		id: 5,
		name: 'Carla',
		country: 'USA'
	}];

	const filteredPatients = filterAmericanPatients(patients);

	expect(filteredPatients).toMatchInlineSnapshot(`
[
  {
    "country": "USA",
    "id": 1,
    "name": "matheus",
  },
  {
    "country": "USA",
    "id": 4,
    "name": "Carla",
  },
]
`);
})
