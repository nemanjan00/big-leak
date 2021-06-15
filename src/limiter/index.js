const dataman = require("dataman");
const limit = require("../limit");

const defaultOptions = {
	url: "memory://",
	prefix: "leaky:",
	delimiter: ":",
	initialValue: 0,
	refillTime: 24 * 60 * 60 * 1000, // 1-day
	refillAmount: 20,
	updateType: "float"
};

module.exports = (customOptions) => {
	customOptions = customOptions || {};

	const options = {
		...defaultOptions,
		...customOptions
	};

	const limiter = {
		_storage: undefined,
		_options: undefined,

		_init: (options) => {
			limiter._storage = dataman.storage(options.url);
			limiter._options = options;

			return limiter;
		},

		limit: (...args) => {
			return limit(limiter._options, limiter._storage, ...args);
		}
	};

	return limiter._init(options);
};
