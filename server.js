var mysql = require('mysql2');
var db = require('./db/connection');
var inquirer = require('inquirer');
var table = require('console-table-printer');
var add = require('./lib/add');
var update = require('./lib/update');
var view = require('./lib/view');
var tableView = require('./lib/tableViews');

// start server after db connection
db.connect((err) => {
	if (err) throw err;
	exports.init();
});

const quit = () => {
	db.end();
	console.log(`
	
█─▄▄▄▄█─▄▄─█─▄▄─█▄─▄▄▀█▄─▄─▀█▄─█─▄█▄─▄▄─█░█░█
█─██▄─█─██─█─██─██─██─██─▄─▀██▄─▄███─▄█▀█▄█▄█
▀▄▄▄▄▄▀▄▄▄▄▀▄▄▄▄▀▄▄▄▄▀▀▄▄▄▄▀▀▀▄▄▄▀▀▄▄▄▄▄▀▄▀▄▀
	
	`);	
};

exports.init = () => {
	console.log(`

┏━━━┓╋╋╋╋╋┏┓╋╋╋╋╋╋╋╋╋╋╋╋╋╋┏━┓┏━┓
┃┏━━┛╋╋╋╋╋┃┃╋╋╋╋╋╋╋╋╋╋╋╋╋╋┃┃┗┛┃┃
┃┗━━┳┓┏┳━━┫┃┏━━┳┓╋┏┳━━┳━━┓┃┏┓┏┓┣━━┳━┓┏━━┳━━┳━━┳━┓
┃┏━━┫┗┛┃┏┓┃┃┃┏┓┃┃╋┃┃┃━┫┃━┫┃┃┃┃┃┃┏┓┃┏┓┫┏┓┃┏┓┃┃━┫┏┛
┃┗━━┫┃┃┃┗┛┃┗┫┗┛┃┗━┛┃┃━┫┃━┫┃┃┃┃┃┃┏┓┃┃┃┃┏┓┃┗┛┃┃━┫┃
┗━━━┻┻┻┫┏━┻━┻━━┻━┓┏┻━━┻━━┛┗┛┗┛┗┻┛┗┻┛┗┻┛┗┻━┓┣━━┻┛
╋╋╋╋╋╋╋┃┃╋╋╋╋╋╋┏━┛┃╋╋╋╋╋╋╋╋╋╋╋╋╋╋╋╋╋╋╋╋╋┏━┛┃
╋╋╋╋╋╋╋┗┛╋╋╋╋╋╋┗━━┛╋╋╋╋╋╋╋╋╋╋╋╋╋╋╋╋╋╋╋╋╋┗━━┛

`);
	inquirer
		.prompt({
			type: 'list',
			name: 'action',
			message: 'What would you like to do? ',
			choices: [
				'View all departments',
				'View all roles',
				'View all employees',
				'Add a department',
				'Add a role',
				'Add an employee',
				// 'Update an employee role',
				'Quit',
			],
		})

		.then((answers) => {
			var choices = answers;
			var choices = {
				'View all departments': tableView.tableViewDepartments,	
				'View all roles': tableView.tableViewRoles,
				'View all employees': tableView.tableViewEmployees,		
				'Add a department': add.addADepartment,
				'Add a role': add.addARole,
				'Add an employee': add.addAnEmployee,
				// 'Update an employee role': update.updateAnEmployeeRole,
				'Quit': quit,
			};
			choices[answers.action]();
		})
		.catch((error) => {
			if (error.isTtyError) {
			}
		});
};
