const createDBConnection = require('./db.js');

const checkUsername = (username) => {
  const sql = `SELECT * FROM customers WHERE email = ?`;
  const conn = createDBConnection();

  return new Promise((resolve, reject) => {
    conn.query(sql, [username], (err, rows, fields) => {
      if (err) { throw err; }
      resolve(rows);
    });
  });
}

module.exports = {
  checkUsername: checkUsername
}
