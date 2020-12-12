const getQueryResult = require('./getQueryResult');

const getServices = async() => {
  const sql = 'SELECT * FROM services';

  return getQueryResult(sql);
}

module.exports = {
  getServices
}
