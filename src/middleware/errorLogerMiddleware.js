const logger = require('../common/logger');

/* eslint-disable */
const errorLogerMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const errMessage = err.message;
  const { url, method } = req;
  const body = JSON.stringify(req.body);
  const query = JSON.stringify(req.query);

  logger.error(
    `${method}, ${url}, status: ${statusCode}, error: ${errMessage}, query: ${query}, params: ${body}}`
  );

  res.status(statusCode).json({ error: errMessage });
};

module.exports = errorLogerMiddleware;
