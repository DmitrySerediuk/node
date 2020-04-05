const taskRepo = require('./task.memory.repository');

const getAll = () => taskRepo.getAll();
const getById = id => taskRepo.getById(id);

const create = (boardId, data) => {
  data.boardId = boardId;
  return taskRepo.create(data);
};

const update = (id, data) => taskRepo.update(id, data);
const remove = id => taskRepo.remove(id);
const getByBoardId = boardId => taskRepo.getByBoardId(boardId);
const cleanUserTask = userId => taskRepo.cleanUserTask(userId);
const deleteByBoardId = boardId => taskRepo.deleteByBoardId(boardId);

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  getByBoardId,
  cleanUserTask,
  deleteByBoardId
};
