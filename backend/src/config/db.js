const fs = require('fs');
const mysql = require('mysql2/promise');
require('dotenv').config();

let ssl;
if (process.env.DB_SSL === 'true') {
  ssl = process.env.DB_SSL_CA ? { ca: fs.readFileSync(process.env.DB_SSL_CA) } : { rejectUnauthorized: false };
}

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  dateStrings: true,
  ssl,
});

module.exports = pool;
