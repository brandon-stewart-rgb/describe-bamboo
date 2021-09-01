var app = require("../server");
var mysql = require('mysql2');
var db = require('../db/connection');
var table = require('console-table-printer');
var inquirer = require('inquirer');
inquirer.registerPrompt('number', require('inquirer-number-plus'));

// start server after db connection
db.connect((err) => {if (err) throw err;});

exports.updateAnEmployeeRole = () => {


};