/* eslint-disable no-sync */
const usersRepo = require('../users/user.db.repository');
const { JWT_SECRET_KEY } = require('../../common/config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const BYCTYPT_SALT_ROUND = require('../../common/config');

const hashPwd = password => {
  return bcrypt.hashSync(password, BYCTYPT_SALT_ROUND);
};

const verifyPwd = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

const getJWTToken = async data => {
  const { login, password } = data;
  const userData = await usersRepo.getByLogin(login);
  if (userData && verifyPwd(password, userData.password)) {
    return jwt.sign(
      { userId: userData.id, login: userData.login },
      JWT_SECRET_KEY,
      { expiresIn: '24h' }
    );
  }
  return null;
};

module.exports = { getJWTToken, hashPwd };
