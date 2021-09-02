var inquirer = require('inquirer');
var mysql = require('mysql2');
var db = require('../db/connection');
var app = require('../server');
var view = require('./view');

// start server after db connection
db.connect((err) => {
	if (err) throw err;
});

// add an employee
exports.updateAnEmployeeRole = () => {
	view.viewAllRoles(function (roleResults) {
		// pushing role results with id and title into empty array
		var roles = [];
		for (var i = 0; i < roleResults.length; i++) {
			var roleValues = {
				name: roleResults[i].title,
				value: {
					id: roleResults[i].role_id,
					role: roleResults[i].title,
				},
			};

			roles.push(roleValues);
		}

		view.viewAllEmployees(function (employeeResults) {
			// pushing employee results with first and last name as well as id into empty array
			var employees = [];
			for (var i = 0; i < employeeResults.length; i++) {
				var employeeFullName = {
					name:
						employeeResults[i].first_name + ' ' + employeeResults[i].last_name,
					value: {
						firstName: employeeResults[i].first_name,
						lastName: employeeResults[i].last_name,
						id: employeeResults[i].emp_id,
					},
				};

				employees.push(employeeFullName);
			}

			var questions = [
				{
					type: 'list',
					message: 'What employee would you like to update? ',
					name: 'employee',
					choices: employees,
				},
				{
					type: 'list',
					message: 'Which role would you like change for Employee? ',
					name: 'role',
					choices: roles,
				},
			];

			inquirer.prompt(questions).then((answers) => {
				const sql = `UPDATE employee SET emp_role_id = ${answers.role.id} WHERE  emp_id = ${answers.employee.id}`;

				db.query(sql, (err, results) => {
					if (err) throw err;
					console.log(
						'==================================================================================='
					);
					console.log(
						'Successfully updated employee: ' +
							answers.employee.firstName +
							' ' +
							answers.employee.lastName +
							'! New role: ' +
							answers.role.role
					);
					console.log(
						'==================================================================================='
					);
					app.init();
				});
			});
		});
	});
};