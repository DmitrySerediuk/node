const logger = require('../common/logger');
const { INTERNAL_SERVER_ERROR } = require('http-status-codes');

/* eslint-disable */
const errorLogerMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || INTERNAL_SERVER_ERROR;
  const errMessage = err.message || 'Internal server error';
  const { url, method } = req;
  const body = JSON.stringify(req.body);
  const query = JSON.stringify(req.query);

  logger.error(
    `${method}, ${url}, status: ${statusCode}, error: ${errMessage}, query: ${query}, params: ${body}}`
  );

  res.status(statusCode).send({ error: errMessage });
};

module.exports = errorLogerMiddleware;
