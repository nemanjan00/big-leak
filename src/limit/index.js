const bucket = require("../bucket");

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
				const defaultBucketOptions = {
					value: limit._options.initialValue,
					refillTime: limit._options.refillTime,
					refillAmount: limit._options.refillAmount,
					lastUpdate: Date.now(),
					updateType: limit._options.updateType,
					maxValue: limit._options.maxValue,
					updateType: limit._options.updateType
				};

				if(!bucketOptions) {
					bucketOptions = defaultBucketOptions;
				}

				Object.assign(bucketOptions, defaultBucketOptions);

				Object.keys(bucketOptions).forEach(propName => {
					if(!isNaN(bucketOptions[propName])) {
						bucketOptions[propName] = +bucketOptions[propName];
					}
				});

				return bucketOptions;
			});
		},

		setStatus: (status) => {
			return limit._storage.hash.set(limit._namespace, status);
		},

		getNamespace: () => limit._namespace,

		test: () => {
			return new Promise((resolve, reject) => {
				limit.getStatus().then(status => {
					const bucketTick = bucket(status).tick();

					resolve(bucketTick.value > 0);
				}).catch(reject);
			});
		},

		decrement: () => {
			return new Promise((resolve, reject) => {
				limit.getStatus().then(status => {
					const bucketTick = bucket(status).tick();

					bucketTick.value = Math.max(bucketTick.value - 1, 0);

					limit.setStatus(bucketTick).then(resolve).catch(reject);
				}).catch(reject);
			});
		},

		wrapper: (func) => {
			return (...args) => {
				return new Promise((resolve, reject) => {
					limit.test().then(result => {
						if(result) {
							limit.decrement();

							return func(...args).then(resolve).catch(reject);
						}

						reject(new Error("Too many requests"));
					}).catch(reject);
				});
			};
		}
	};

	return limit._init(options, storage, ...args);
};
