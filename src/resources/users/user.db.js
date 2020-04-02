const User = require('./user.model');

const userDb = [
  new User({ name: 'Pavel', login: 'test', password: '12314' }),
  new User({ name: 'Igor', login: 'good', password: '34234' }),
  new User({ name: 'Sasha', login: 'root', password: '1231' }),
  new User({ name: 'Petr', login: 'bot', password: '86543df' })
];

module.exports = userDb;
