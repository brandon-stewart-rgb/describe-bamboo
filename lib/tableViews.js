var mysql = require('mysql2');
var db = require('../db/connection');
var app = require("../server");
var table = require('console-table-printer');

db.connect((err) => {
	if (err) throw err;

});

// view all roles
exports.tableViewRoles = () => {
	const sql = `SELECT * FROM role`;
	db.query(sql, (err, rows) => {
		if (err) {
			console.log(err);
			return;
		}
		console.log('===============================================================================');
		console.table(rows);
		console.log('===============================================================================');
	});
	console.log('---')
	app.init();	
};

// view all departments
exports.tableViewDepartments = () => {
	const sql = `SELECT * FROM department`;

	db.query(sql, (err, rows) => {
		if (err) {
			console.log(err);
			return;
		}
		console.log('===============================================================================');
		console.table(rows);
	});
	app.init();	
};

// view all departments
exports.tableViewEmployees = () => {
	const sql = `SELECT * FROM employee`;

	db.query(sql, (err, rows) => {
		if (err) {
			console.log(err);
			return;
		}
		console.log('===============================================================================');
		console.table(rows);
	});
	app.init();	
};