const dataman = require("dataman");

const defaultOptions = {
	url: "memory://"
};

module.exports = (customOptions) => {
	customOptions = customOptions || {};

	const options = {
		...defaultOptions,
		...customOptions
	};

	const limiter = {
		_storage: undefined,
		_init: (options) => {
			limiter._storage = dataman.storage(options.url);

			return limiter;
		}
	};

	return limiter._init(options);
};
