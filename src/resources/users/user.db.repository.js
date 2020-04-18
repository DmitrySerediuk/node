const User = require('./user.model');

const getAll = async () => {
  return await User.find();
};

const getById = async id => {
  return await User.findOne({ _id: id });
};

const create = async data => {
  return await User.create(data);
};

const update = async (id, objData) => {
  return await User.findOneAndUpdate({ _id: id }, objData);
};

const remove = async id => {
  return (await User.remove({ _id: id }).n) !== 0;
};

module.exports = { getAll, getById, create, update, remove };
