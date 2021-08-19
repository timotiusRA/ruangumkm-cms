const mysql = require("mysql2");
const { HOST, DB, USER, PASS, DB_PORT } = process.env;

const db = mysql.createConnection({
  host: HOST,
  user: USER,
  password: PASS,
  database: DB,
  port: DB_PORT,
});

db.connect((err) => {
  if (err) throw err;
  console.log("Database Conected");
});

module.exports = db;
