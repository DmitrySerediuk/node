const userDb = require('./user.db');

const getAll = async () => {
  // TODO: mock implementation. should be replaced during task development
  return userDb;
};

module.exports = { getAll };
