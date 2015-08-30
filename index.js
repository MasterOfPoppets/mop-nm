#!/usr/bin/env node

var metalsmith = require('metalsmith');
var path = require('path');

metalsmith(__dirname)
	.destination(path.join(process.cwd(), process.argv[2]))
	.build(function onBuild(err) {
		if (err) {
			throw err;
		}
	});
