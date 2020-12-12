const pool = require('../dbPool.js');

const getQueryResult = (sql, params = [], mapper = val => val) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, params, (err, rows) => {
      if (err) { throw err; }
      resolve(mapper(rows));
    });
  });
}

module.exports = getQueryResult
