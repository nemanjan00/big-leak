module.exports = (bucketOptions) => {
	const bucket = {
		_options: undefined,

		_init: (options) => {
			bucket._options = options;

			return bucket;
		},

		tick: () => {
			const options = bucket._options;

			if(options.value > 0) {
				return options;
			}

			let refillPending = (Date.now() - options.lastUpdate) / options.refillTime;

			if(options.updateType !== "float") {
				refillPending = Math.floor(refillPending);
			}

			if(refillPending * options.refillAmount  < 1) {
				return options;
			}

			const newValue = options.value + Math.floor(refillPending * options.refillAmount);

			const realRefillPending = Math.floor(refillPending * options.refillAmount) / options.refillAmount;

			const newTime = Math.floor(realRefillPending * options.refillTime + options.lastUpdate);

			options.value = Math.max(newValue, options.maxValue);
			options.lastUpdate = newTime;

			return options;
		}
	};

	return bucket._init(bucketOptions);
};

