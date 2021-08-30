const mysql = require('mysql2');

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
//  init();
 //
};

module.exports = {
    viewAllDepartments
}