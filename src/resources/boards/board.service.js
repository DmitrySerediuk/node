const boardRepo = require('./board.db.repository');

const getAll = () => boardRepo.getAll();
const getById = id => boardRepo.getById(id);
const create = data => boardRepo.create(data);
const update = (id, data) => boardRepo.update(id, data);
const remove = id => boardRepo.remove(id);

module.exports = { getAll, getById, create, update, remove };
