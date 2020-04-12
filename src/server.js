const { PORT } = require('./common/config');
const app = require('./app');
const logger = require('./common/logger');

process.on('unhandledRejection', reason => {
  logger.error(`Unhandled Rejection at promice by reason: ${reason}`);
});

process.on('uncaughtException', err => {
  logger.error(`Uncaught Exception ${err}`);
});

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);

// UNCOMMENT IT FOR CHEK uncaughtException ERROR
// throw new Error('Test uncaughtException error');
