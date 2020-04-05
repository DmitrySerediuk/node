const Task = require('./task.model');

const taskDb = [
  new Task({
    id: '1',
    title: 'task 1',
    order: '1',
    description: 'test task 1',
    userId: '1',
    boardId: '1',
    columnId: '1'
  }),

  new Task({
    id: '2',
    title: 'task 2',
    order: '1',
    description: 'test task 2',
    userId: '1',
    boardId: '2',
    columnId: null
  }),

  new Task({
    id: '3',
    title: 'task 3',
    order: '4',
    description: 'test task 3',
    userId: '3',
    boardId: '3',
    columnId: null
  }),

  new Task({
    id: '4',
    title: 'task 4',
    order: '4',
    description: 'test task 4',
    userId: null,
    boardId: null,
    columnId: null
  })
];

module.exports = taskDb;
