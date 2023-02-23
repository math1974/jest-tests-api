const sanitizeHtml = require('sanitize-html');

const sanitizeValue = value => {
	let parsedValue = null;

	if (!value) {
		return parsedValue;
	}

	parsedValue = sanitizeHtml(value, {
		allowedTags: [],
		allowedAttributes: {}
	});

	return parsedValue ? parsedValue.trim() : null;
};

const transformTo = defaultValue => {
	return value => value || defaultValue;
};

module.exports = {
	sanitizeValue,
	transformTo
};
