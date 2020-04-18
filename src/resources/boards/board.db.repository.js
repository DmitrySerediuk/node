const Board = require('./board.model');

const getAll = async () => {
  return await Board.find();
};

const getById = async id => {
  return await Board.findOne({ _id: id });
};

const create = async data => {
  return await Board.create(data);
};

const update = async (id, objData) => {
  return await Board.findOneAndUpdate({ _id: id }, objData);
};

const remove = async id => {
  await Board.deleteOne({ _id: id });
  return true;
};

module.exports = { getAll, getById, create, update, remove };
