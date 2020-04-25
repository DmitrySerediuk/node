const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const { UNAUTHORIZED } = require('http-status-codes');
const { JWT_SECRET_KEY } = require('../common/config');

const checkToken = async (req, res, next) => {
  let token = req.headers.authorization;
  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  if (token && (await jwt.verify(token, JWT_SECRET_KEY))) {
    return next();
  }
  return next(new createError(UNAUTHORIZED, 'Unauthorized'));
};

module.exports = checkToken;
