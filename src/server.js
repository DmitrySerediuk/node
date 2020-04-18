const { PORT } = require('./common/config');
const connectToDb = require('./db/db.connect');
const app = require('./app');
const logger = require('./common/logger');

process.on('unhandledRejection', reason => {
  logger.error(`Unhandled Rejection at promice by reason: ${reason}`);
});

connectToDb(() => {
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});
