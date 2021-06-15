module.exports = (options, storage, ...args) => {
	const limit = {
		_namespace: undefined,
		_storage: undefined,
		_options: undefined,

		_init: (options, storage, ...args) => {
			limit._storage = storage;
			limit._namespace = options.prefix + args.join(options.delimiter);
			limit._options = options;

			return limit;
		},

		getStatus: () => {
			return limit._storage.hash.get(limit._namespace).then(bucketOptions => {
				if(!bucketOptions) {
					bucketOptions = {
						value: limit._options.initialValue,
						refillTime: limit._options.refillTime,
						refillAmount: limit._options.refillAmount,
						lastUpdate: Date.now(),
						updateType: limit._options.updateType
					};
				}

				Object.keys(bucketOptions).forEach(propName => {
					if(!isNaN(bucketOptions[propName])) {
						bucketOptions[propName] = +bucketOptions[propName];
					}
				});

				return bucketOptions;
			});
		},

		getNamespace: () => limit._namespace,

		test: () => {
		}
	};

	return limit._init(options, storage, ...args);
};
