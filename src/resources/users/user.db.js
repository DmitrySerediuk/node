const User = require('./user.model');

const userDb = [
  new User({ id: '1', name: 'Pavel', login: 'test', password: '12314' }),
  new User({ id: '2', name: 'Igor', login: 'good', password: '34234' }),
  new User({ id: '3', name: 'Sasha', login: 'root', password: '1231' }),
  new User({ id: '4', name: 'Petr', login: 'bot', password: '86543df' })
];

module.exports = userDb;
