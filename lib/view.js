var mysql = require('mysql2');
var db = require('../db/connection');
var inquirer = require('inquirer');
var app = require("../server");
var table = require('console-table-printer');

// start server after db connection
db.connect((err) => {if (err) throw err;});



// view all departments
exports.viewAllDepartments = (callBack) => {
	const sql = `SELECT * FROM department`;
	db.query(sql, (err, results)=> {
		if (err) throw err;
		callBack(results);	
	});
	
};

// view all roles
exports.viewAllRoles = (callBack) => {
	const sql = `SELECT * FROM role`;
	db.query(sql, (err, results)=> {
		if (err) throw err;
		callBack(results);	
	});

	
	
};
// view all roles
exports.viewAllEmployees = (callBack) => {
	const sql = `SELECT * FROM employee`;
	db.query(sql, (err, results)=> {
		if (err) throw err;
		callBack(results);	
	});
	
};


