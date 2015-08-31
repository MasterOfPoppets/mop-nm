#!/usr/bin/env node --harmony_generators

var metalsmith = require('metalsmith');
var template = require('metalsmith-in-place');
var path = require('path');
var inquirer = require('inquirer');
var _camel = require('lodash/string/camelCase');
var _keys = require('lodash/object/forOwn');

function scaffold() {
	metalsmith(__dirname)
		.use(ask)
		.use(template({
			'engine': 'handlebars'
		}))
		.destination(path.join(process.cwd(), process.argv[2]))
		.build(function onBuild(err) {
			if (err) {
				throw err;
			}
		});
}

function ask(files, metalsmith, done) {
	var metadata = metalsmith.metadata();
	var questions = [{
		name: 'moduleName',
		message: 'What would you like to call the module?'
	}, {
		name: 'username',
		message: 'What is your GitHub username?'
	}];

	inquirer.prompt(questions, function callback(answers) {
		answers.camelModuleName = _camel(answers.moduleName);

		_keys(answers, function updateMetadata(answer, name) {
			metadata[name] = answer;
		});
		done();
	});
}

module.exports = scaffold;
