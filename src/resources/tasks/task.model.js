const uuid = require('uuid');
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  order: Number,
  description: String,
  userId: {
    type: String,
    default: null
  },
  boardId: {
    type: String,
    default: null
  },
  columnId: {
    type: String,
    default: null
  },
  _id: {
    type: String,
    default: uuid
  }
});

taskSchema.statics.toResponse = task => {
  const { id, title, order, description, userId, boardId, columnId } = task;
  return { id, title, order, description, userId, boardId, columnId };
};

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
