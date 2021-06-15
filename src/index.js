const limiter = require("./limiter")();

const limit = limiter.limit(123);

limit.decrement();

const consoleLog = limit.wrapper((...args) => {
	console.log(...args);

	return Promise.resolve();
});

Array(50).fill(true).reduce((prev) => prev.then(() => consoleLog(123)), Promise.resolve());

