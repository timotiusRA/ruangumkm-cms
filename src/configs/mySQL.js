const mysql = require("mysql");
const { HOST, DB, USER, PASS } = process.env;

const db = mysql.createConnection({
  host: HOST,
  user: USER,
  password: PASS,
  database: DB,
});

db.connect((err) => {
  if (err) throw err;
  console.log("Database Conected");
});

module.exports = db;
