const mysql = require("mysql2");
const { DB_HOST, DB_NAME, DB_USER, DB_PASS, DB_PORT } = process.env;

const db = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  port: DB_PORT,
});

db.connect((err) => {
  if (err) throw err;
  console.log("Database Conected");
});

module.exports = db;
