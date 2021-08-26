require('dotenv').config()
const express = require('express');
const mysql = require('mysql2');
const cTable = require('console.table');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: '',
    database: 'inventory_db'
  },
  console.log(`Connected to the inventory_db database.`)
);

// Query database
let deletedRow = `DELETE FROM books WHERE id = ?`;


db.query(deletedRow, 2, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});

let select = 'SELECT * FROM books';
// Query database
db.query(select, function (err, results) {
  console.log(results);
});



// tests
console.table([
    {
      name: 'foo',
      age: 10
    }, {
      name: 'bar',
      age: 20
    }
  ]);







// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

// Listen on port
app.listen(PORT, ()=>   {
    console.log(`Server started on ${PORT}`);
 }); 
 