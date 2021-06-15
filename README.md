# big-leak 🌊

[![Build Status](https://travis-ci.org/nemanjan00/big-leak.svg?branch=master)](https://travis-ci.org/nemanjan00/big-leak)

[Leaky bucket](https://en.wikipedia.org/wiki/Leaky_bucket) implementation

## Table of contents

<!-- vim-markdown-toc GFM -->

* [Installation](#installation)
	* [NPM](#npm)
	* [Yarn](#yarn)
* [Usage](#usage)
* [Authors](#authors)

<!-- vim-markdown-toc -->

## Installation

### NPM

```bash
npm install big-leak --save
```

### Yarn

```bash
yarn add big-leak
```

## Usage

```javascript
const limiter = require("big-leak")({
	url: "memory://", // Dataman connection url
	prefix: "leaky:", // Redis key prefix
	delimiter: ":", // Redix key delimiter
	initialValue: 0, // How full do you want bucket to be?
	maxValue: 20, // How much do you want bucket to be able to fill up?
	refillTime: 24 * 60 * 60 * 1000, // 1-day - how often should bucket be filled up
	refillAmount: 20, // How much should bucket be refilled each refill time
	updateType: "float" // Do you want to refill bucket less thatn refillAmount?
});

const limit = limiter.limit("send-request", 123);

const sendRequest = limit.wrapper((url) => {
	console.log("Sending request");

	return Promise.resolve();
});

Array(50).fill(true).reduce((prev) => prev.then(sendRequest), Promise.resolve());
```

## Authors

* [nemanjan00](https://github.com/nemanjan00)
