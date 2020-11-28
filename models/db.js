const mysql = require('mysql');

const createDBConnection = () => {
  const conn = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  return conn;
}

module.exports = createDBConnection;
