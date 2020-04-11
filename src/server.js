const { PORT } = require('./common/config');
const app = require('./app');
// const logger = require('./common/logger');

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);

// process.on('unhandledRejection', (reason,  promise) => {
//   logger.error('Unhandled Rejection', reason);
//   process.exit(1);
// });

// process.on('uncaughtException', err => {
//   logger.error('Uncaught Exception', err);
//   process.exit(1);
// });
