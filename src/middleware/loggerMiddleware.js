const logger = require('../common/logger');

const loggerMiddleware = (req, res, next) => {
  const { url, method } = req;
  const body = JSON.stringify(req.body);
  const query = JSON.stringify(req.query);
  logger.info(`${method} ${url} |  query: ${query}, params: ${body}`);
  next();
};

module.exports = loggerMiddleware;
