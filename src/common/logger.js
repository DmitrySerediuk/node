const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'info',
  format: format.printf(info => `${info.level}: ${info.message}`),
  transports: [
    new transports.File({
      filename: './logs/access_log.log',
      level: 'info',
      format: format.combine(format.uncolorize())
    }),
    new transports.File({
      filename: './logs/error_log.log',
      level: 'error',
      format: format.combine(format.uncolorize())
    }),
    new transports.Console()
  ],
  exceptionHandlers: [
    new transports.File({ filename: './logs/exceptions.log' }),
    new transports.Console()
  ],
  exitOnError: true
});

module.exports = logger;
