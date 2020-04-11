const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'info',
  format: format.combine(format.colorize(), format.cli(), format.timestamp()),
  transports: [
    new transports.File({
      filename: './logs/access_log.log',
      level: 'info',
      format: format.combine(format.uncolorize(), format.json())
    }),
    new transports.File({
      filename: './logs/error_log.log',
      level: 'error',
      format: format.combine(format.uncolorize(), format.json())
    }),
    new transports.Console()
  ]
});

module.exports = logger;
