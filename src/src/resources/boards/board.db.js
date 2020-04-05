const Board = require('./board.model');

const boardDb = [
  new Board({ id: '1', title: 'board1', column: 'column1' }),
  new Board({ id: '2', title: 'board1', column: 'column1' })
];

module.exports = boardDb;
