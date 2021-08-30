const db = require('./db/connection');
// var myFunctions = require('./utils/departmentFunctions');
var inquirer = require('inquirer');
const mysql = require('mysql2');




// start server after db connection
db.connect((err) => {
	if (err) throw err;
	console.log();
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
};
// view all roles
const viewAllRoles = () => {
	const sql = `SELECT * FROM role`;
	db.query(sql, (err, rows)=> {
		if (err) {
			console.log(err);
			return;
		}
		console.log();// this helps the display of the table.
		console.table(rows);
	
	});
	init();
};

//view all employees
const viewAllEmployees = () => {
	const sql = `SELECT * FROM employee`;
	db.query(sql, (err, rows)=>{
		if(err){
			console.log(err);
			return;
		}
		console.log();// this helps the display of the table.
		console.table(rows);
	});
	init();
};

// .then(function ({ first_name, last_name, manager }) {
// 	connection.query("INSERT INTO employee (first_name, last_name, manager) 
// 		 VALUES ?", ('first_name', 'last_name', 'manager'), function (err, result) {
// 		if (err) throw err;
// })

// add a department 
const addADepartment = () => {

	inquirer 
	.prompt ([
	{
		name: 'addDept',
		type: 'input',
		message: 'What is the new department name?'
	}
	])

	.then((answers)=>{
		const sql = `INSERT INTO department (name) VALUES ('${answers.addDept}')`;
		db.query(sql, (err)=>{
			if(err) { 
				console.log(err)
				return;
			}
			console.table('1 new department inserted: ' + answers.addDept );
		});
		
    });


	
// enter department via inquirer with 'input'
	
	
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
		
				'View all departments': viewAllDepartments,
				'View all roles': viewAllRoles,
				'View all employees': viewAllEmployees,
				'Add a department': addADepartment,
				// 'Add a role': addARole,
				// 'Add an employee': addAnEmployee,
				// 'Update an employee role': updateAnEmployeeRole,
				'Quit': quit,

			};
			choices[answers.action]();
		})
		.catch((error) => {
			if (error.isTtyError) {
				
			} else {
				
			}
		});
};

init();