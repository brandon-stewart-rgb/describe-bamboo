// // add a new department
// exports.addADepartment = () => {
// 	inquirer
// 		.prompt([
// 			{
// 				name: 'addDept',
// 				type: 'input',
// 				message: 'What is the new department name? ',
// 			},
// 		])

// 		.then((answers) => {
// 			const sql = `INSERT INTO department (name) VALUES ('${answers.addDept}')`;
// 			db.query(sql, (err) => {
// 				if (err) throw err;
				
// 			});
//             console.log('===============================================================================');
//             console.log('New department inserted: ' + answers.addDept);
            
//             app.init();
// 		});
// };

// add an employee
exports.addAnEmployee = () => {
	view.viewAllRoles(function (roleResults) {
		// pushing role results into empty array
		var roles = [];
		for (var i = 0; i < roleResults.length; i++) {
			roles.push(roleResults[i].title);
		}
		// // pushing manager results into empty array
		// var managerResults = [];
		// for (var i = 0; i < managerResults.length; i++) {
		// 	managerResults.push(managerResults[i].title);
		// }


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
				name: 'role',
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
			const sql = `INSERT INTO employee (first_name, last_name, emp_role_id)
                         VALUES ('${answers.firstName}', '${answers.lastName}','${roleId}' )`;
			db.query(sql, (err, results) => {
				if (err) throw err;
				console.log(
					'You have successfully added new employee: ' +
						answers.firstName +
						' ' +
						answers.lastName +
						'!!'
				);
				app.init();
			});
		});
	});





    view.viewAllEmployees(function (managerResults) {
		// pushing manager results into empty array
		var managerResults = [];
		for (var i = 0; i < managerResults.length; i++) {
			managerResults.push(managerResults[i].title);
		}
		
		var questions2 = [	
			{
				type: 'list',
				message: "Who is this employee's manager? ",
				name: 'role',
				choices: managers,
			},
		];

		inquirer.prompt(questions2).then((answers) => {
			var roleId = null;
			for (var i = 0; i < roleResults.length; i++) {
				if (roleResults[i].title === answers.role) {
					roleId = roleResults[i].role_id;
				}
			}
			const sql = `INSERT INTO employee (first_name, last_name, emp_role_id)
                         VALUES ('${answers.firstName}', '${answers.lastName}','${roleId}' )`;
			db.query(sql, (err, results) => {
				if (err) throw err;
				console.log(
					'You have successfully added new employee: ' +
						answers.firstName +
						' ' +
						answers.lastName +
						'!!'
				);
				app.init();
			});
		});
	});















};
