const pool = require('../dbPool.js');

const getByUsername = (username) => {
  const sql = `SELECT * FROM customers WHERE email = ?`;

  return new Promise((resolve, reject) => {
    pool.query(sql, [username], (err, rows, fields) => {
      if (err) { throw err; }
      resolve(rows);
    });
  });
}

module.exports = {
  getByUsername
}
