var inquirer = require('inquirer');
var mysql = require('mysql2');
var db = require('../db/connection');
var app = require('../server');
var view = require('./view');
var chalk = require('chalk');

// start server after db connection
db.connect((err) => {
	if (err) throw err;
});

// add a new department
exports.addADepartment = () => {
	inquirer
		.prompt([
			{
				name: 'addDept',
				type: 'input',
				message: 'What is the new department name? ',
			},
		])

		.then((answers) => {
			const sql = `INSERT INTO department (dept_name) VALUES ('${answers.addDept}')`;
			db.query(sql, (err) => {
				if (err) throw err;
			});
			console.log(chalk.blue('==========================================='));
			console.log(chalk.blue('New department added: ' + answers.addDept));
			console.log(chalk.blue('==========================================='));
			app.init();
		});
};

// add a role
exports.addARole = () => {
	view.viewAllDepartments(function (departmentResults) {
		// pushing department results into empty array
		var departments = [];
		for (var i = 0; i < departmentResults.length; i++) {
			departments.push(departmentResults[i].dept_name);
		}

		var questions = [
			{
				name: 'title',
				type: 'input',
				message: 'What is the new role title? ',
			},
			{
				name: 'salary',
				type: 'number',
				message: "What is the new role's salary? ",
			},
			{
				name: 'department',
				type: 'list',
				message: 'What department is this new role in? ',
				choices: departments,
			},
		];
		inquirer.prompt(questions).then((answers) => {
			var departmentId = null;
			for (var i = 0; i < departmentResults.length; i++) {
				if (departmentResults[i].dept_name === answers.department) {
					departmentId = departmentResults[i].dept_id;
				}
			}
			const sql = `INSERT INTO role (title, salary, department_id) VALUES ('${answers.title}', '${answers.salary}','${departmentId}' )`;
			db.query(sql, (err, results) => {
				if (err) throw err;
				console.log(
					chalk.blue(
						'====================================================================================='
					)
				);
				console.log(
					chalk.blue(
						'New role inserted: ' +
							answers.title +
							', with a salary of: ' +
							answers.salary +
							', in the: ' +
							answers.department +
							' department.'
					)
				);
				console.log(
					chalk.blue(
						'====================================================================================='
					)
				);
				app.init();
			});
		});
	});
};

// add an employee
exports.addAnEmployee = () => {
	view.viewAllRoles(function (roleResults) {
		// pushing role results into empty array
		var roles = [];
		for (var i = 0; i < roleResults.length; i++) {
			roles.push(roleResults[i].title);
		}

		view.viewAllEmployees(function (managerResults) {
			// pushing manager results into empty array
			var managers = [];
			for (var i = 0; i < managerResults.length; i++) {
				var managerFullName = {
					name:
						managerResults[i].first_name + ' ' + managerResults[i].last_name,
					value: {
						firstName: managerResults[i].first_name,
						lastName: managerResults[i].last_name,
						id: managerResults[i].emp_id,
					},
				};
				managers.push(managerFullName);
			}

			var questions = [
				{
					type: 'input',
					message: 'Add Employee First Name',
					name: 'firstName',
					default: 'Edward',
				},
				{
					type: 'input',
					message: 'Add Employee Last Name',
					name: 'lastName',
					default: 'Abbey',
				},
				{
					type: 'list',
					message: 'Employee Role',
					name: 'role',
					choices: roles,
				},
				{
					type: 'list',
					message: "Who is this employee's manager? ",
					name: 'manager',
					choices: managers,
				},
			];

			inquirer.prompt(questions).then((answers) => {
				var roleId = null;
				for (var i = 0; i < roleResults.length; i++) {
					if (roleResults[i].title === answers.role) {
						roleId = roleResults[i].role_id;
					}
				}

				// var managerId = null;
				// for (var i = 0; i < managerResults.length; i++) {
				// 	if (managerFullName === answers.manager) {
				// 		managerId = managerResults[i].emp_id;
				// 	}
				// }

				const sql = `INSERT INTO employee (first_name, last_name, emp_role_id, manager_id)
									VALUES ('${answers.firstName}', '${answers.lastName}','${roleId}', '${answers.manager.id}' )`;
				db.query(sql, (err, results) => {
					if (err) throw err;
					console.log(
						chalk.blue(
							'====================================================================================='
						)
					);
					console.log(
						chalk.blue(
							'Successfully added new employee: ' +
								answers.firstName +
								' ' +
								answers.lastName +
								'. Managed by: ' +
								answers.manager.firstName +
								' ' +
								answers.manager.lastName +
								'.'
						)
					);
					console.log(
						chalk.blue(
							'====================================================================================='
						)
					);
					app.init();
				});
			});
		});
	});
};
