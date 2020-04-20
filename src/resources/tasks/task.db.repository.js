const Task = require('./task.model');

const getAll = async () => {
  return await Task.find();
};

const getById = async id => {
  return await Task.findOne({ _id: id });
};

const create = async data => {
  return await Task.create(data);
};

const update = async (id, objData) => {
  return await Task.findOneAndUpdate({ _id: id }, objData);
};

const remove = async id => {
  await Task.deleteOne({ _id: id });
  return true;
};

const getByBoardId = async bId => {
  return await Task.find({ boardId: bId });
};

const cleanUserTask = async uId => {
  await Task.updateMany({ userId: uId }, { userId: null });
  return true;
};

const deleteByBoardId = async bId => {
  await Task.deleteMany({ boardId: bId });
  return true;
};

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

// const getById = async id => {
//   const idValue = db
//     .map(e => {
//       return e.id;
//     })
//     .indexOf(id);
//   if (idValue !== -1) {
//     return db[idValue];
//   }
//   return {};
// };
