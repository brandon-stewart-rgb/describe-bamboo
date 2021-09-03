var mysql = require('mysql2');
var db = require('../db/connection');
var app = require("../server");
var table = require('console-table-printer');


db.connect((err) => {
	if (err) throw err;

});

// view all roles
exports.tableViewRoles = () => {
	const sql = `SELECT R.role_id 'ID', R.title 'Title', salary 'Salary', dept_name 'Department'
	FROM role AS R
	INNER JOIN department AS D ON R.department_id = D.dept_id`;
	db.query(sql, (err, rows) => {
		if (err) {
			console.log(err);
			return;
		}
		console.clear();
		console.table(rows);

	});
	app.init();	
};

// view all departments
exports.tableViewDepartments = () => {
	const sql = `SELECT D.dept_id 'ID', D.dept_name 'Department'
	FROM department AS D`; 

	db.query(sql, (err, rows) => {
		if (err) {
			console.log(err);
			return;
		}
		console.clear();
		console.table(rows);
		
	});
	app.init();	
};

// view all employees and such
exports.tableViewEmployees = () => {
	const sql = `SELECT E.emp_id 'ID', concat(E.first_name, ' ', E.last_name)  'Employee Name', title 'Title', salary 'Salary', dept_name 'Department', 
	concat(E2.first_name, ' ', E2.last_name) AS  Manager
	FROM employee AS E 
	INNER JOIN role AS R ON E.emp_role_id = R.role_id 
	INNER JOIN department AS D ON R.department_id = D.dept_id 
	LEFT JOIN employee AS E2 ON E.manager_id = E2.emp_id;`;

	db.query(sql, (err, rows) => {
		if (err) {
			console.log(err);
			return;
		}
		console.log('');
		console.table(rows);
	});
	app.init();	
};