const pool = require('../dbPool.js');

const resolveCallback = (resolve) => (err, rows, fields) => {
  if (err) { throw err; }
  console
  resolve(rows);
}

const getByUsername = (username) => {
  const sql = `SELECT * FROM customers WHERE email = ?`;

  return new Promise((resolve, reject) => {
    pool.query(sql, [username], resolveCallback(resolve));
  });
}

const getCustomerProfileById = async(customerId) => {
  const customerQuery = `SELECT * FROM customers WHERE customer_id = ?`;
  const customerPetsQuery = `SELECT * FROM pets WHERE customer_id = ?`;

  const [customer] = await new Promise((resolve, reject) => {
    pool.query(customerQuery, [customerId], (err, rows) => {
      if (err) { throw err; }
      resolve(rows);
    });
  });

  const customerPets = await new Promise((resolve, reject) => {
    pool.query(customerPetsQuery, [customerId], resolveCallback(resolve));
  });

  return {
    ...customer,
    pets: customerPets
  }
}

module.exports = {
  getByUsername,
  getCustomerProfileById
}
