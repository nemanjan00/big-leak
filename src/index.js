const limiter = require("./limiter")();

limiter.limit(123).getStatus().then(console.log);
