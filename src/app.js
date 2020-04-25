const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');

const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const loginRouter = require('./resources/login/login.router');

const checkTocken = require('./middleware/checkTocken');
const loggerMiddleware = require('./middleware/loggerMiddleware');
const errorLogerMiddleware = require('./middleware/errorLogerMiddleware');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use(loggerMiddleware);
app.use('/login', loginRouter);
app.use('/users', checkTocken, userRouter);
app.use('/boards', checkTocken, boardRouter);
app.use('/boards', checkTocken, taskRouter);
app.use(checkTocken);
app.use(errorLogerMiddleware);

module.exports = app;
