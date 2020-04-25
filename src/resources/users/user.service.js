/* eslint-disable require-atomic-updates */
const usersRepo = require('./user.db.repository');
const { hashPwd } = require('../login/login.service');

const getAll = () => usersRepo.getAll();
const getById = id => usersRepo.getById(id);
const create = async data => {
  const hashedPwd = await hashPwd(data.password);
  data.password = hashedPwd;
  return usersRepo.create(data);
};
const update = (id, data) => usersRepo.update(id, data);
const remove = id => usersRepo.remove(id);

module.exports = { getAll, getById, create, update, remove };
