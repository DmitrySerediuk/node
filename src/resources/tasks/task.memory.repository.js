let db = require('./task.db');
const Task = require('./task.model');

const getAll = async () => {
  return db;
};

const getById = async id => {
  const idValue = db
    .map(e => {
      return e.id;
    })
    .indexOf(id);
  if (idValue !== -1) {
    return db[idValue];
  }
  return {};
};

const create = async data => {
  const newRow = new Task(data);
  db.push(newRow);
  return newRow;
};

const update = async (id, objData) => {
  const idForUpdate = db
    .map(e => {
      return e.id;
    })
    .indexOf(id);

  if (idForUpdate === -1) {
    return false;
  }

  for (const key in objData) {
    if (Object.prototype.hasOwnProperty.call(db[idForUpdate], key)) {
      db[idForUpdate][key] = objData[key];
    }
  }

  return db[idForUpdate];
};

const remove = async id => {
  const idForDelete = db
    .map(e => {
      return e.id;
    })
    .indexOf(id);
  if (idForDelete === -1) {
    return false;
  }
  db.splice(idForDelete, 1);
  return true;
};

const getByBoardId = async boardId => {
  const tasks = db.filter(e => {
    return e.boardId === boardId;
  });
  return tasks;
};

const cleanUserTask = async userId => {
  db.forEach(e => {
    if (e.userId === userId) e.userId = null;
  });
  return true;
};

const deleteByBoardId = async boardId => {
  const tasks = db.filter(e => {
    return e.boardId !== boardId;
  });
  db = tasks;
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
