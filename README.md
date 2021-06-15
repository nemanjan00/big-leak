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
	prefix: "leaky-bucket:"
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
