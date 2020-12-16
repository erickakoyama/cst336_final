const getQueryResult = require('./getQueryResult');

const getAllPets = async() => {
  const sql = 'SELECT * FROM pets WHERE checked_in = 1';

  return getQueryResult(sql);
}

module.exports = {
  getAllPets
}
