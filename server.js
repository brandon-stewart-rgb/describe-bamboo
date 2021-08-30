const db = require('./db/connection');
// const apiRoutes = require('./routes/apiRoutes');
var inquirer = require('inquirer');
const mysql = require('mysql2');


// start server after db connection
db.connect((err) => {
	if (err) throw err;
	console.log('The database is now connected');
});

// view all departments
const viewAllDepartments = () => {
	const sql = `SELECT * FROM department`;

	db.query(sql, (err, rows) => {
		if (err) {
			console.log(err);
			return;
		}
    console.log();// this helps the display of the table.
		console.table(rows);
	});
  console.log();
 init();
 //
};

const quit = () => {
	db.end();
	console.log('Goodbye!!');
};

// place in function
function init() {
	inquirer
		.prompt([
			{
				type: 'list',
				name: 'action',
				message: 'What would you like to do?',
				choices: [
					'View all departments',
					'View all roles',
					'View all employees',
					'Add a department',
					'Add a role',
					'Add an employee',
					'Update an employee role',
					'Quit',
				],
			},
		])

		.then((answers) => {
			var choices = answers;
			var choices = {
				Quit: quit,

				'View all departments': viewAllDepartments,
			};
			choices[answers.action]();
		})
		.catch((error) => {
			if (error.isTtyError) {
				// Prompt couldn't be rendered in the current environment
			} else {
				// Something else went wrong
			}
		});
}

init();
