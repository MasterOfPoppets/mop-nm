var metalsmith = require('metalsmith');
var template = require('metalsmith-in-place');
var path = require('path');
var inquirer = require('inquirer');
var _s = require('lodash/string');

function scaffold(outputFolder) {
	metalsmith(__dirname)
		.use(ask)
		.use(template({
			'engine': 'handlebars'
		}))
		.destination(path.join(process.cwd(), outputFolder))
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
		answers.camelModuleName = _s.camelCase(answers.moduleName);

		Object.keys(answers).forEach(function updateMetadata(key) {
			metadata[key] = answers[key];
		});
		done();
	});
}

module.exports = scaffold;
