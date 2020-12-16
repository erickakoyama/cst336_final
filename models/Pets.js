const getQueryResult = require('./getQueryResult');

const getAllPets = async() => {
  const sql = 'SELECT * FROM pets';

  return getQueryResult(sql);
}

module.exports = {
  getAllPets
}
