const mysql = require('mysql');

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nib_stock"
});

db.connect((err) => {
  if (err) {
    console.log('Database connection error:' );
  } else {
    console.log('Database connected...');
  }
});

module.exports = { db };
