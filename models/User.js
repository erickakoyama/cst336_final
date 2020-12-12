const pool = require('../dbPool.js');
const getQueryResult = require('./getQueryResult.js');

const getByUsername = (username) => {
  const sql = 'SELECT * FROM customers WHERE email = ?';
  return getQueryResult(sql, [username]);
}

const getPetsByCustomerId = (customerId) => {
  return getQueryResult('SELECT * FROM pets WHERE customer_id = ?', [customerId]);
}

const getCustomerProfileById = async(customerId) => {
  const customerQuery = 'SELECT * FROM customers WHERE customer_id = ?';

  // destructure out password, so we don't send it to the client
  const [{ password, ...customer }] = await getQueryResult(customerQuery, [customerId]);

  const customerPets = await getPetsByCustomerId(customerId);

  return {
    ...customer,
    pets: customerPets
  }
}

module.exports = {
  getByUsername,
  getCustomerProfileById,
  getPetsByCustomerId
}
