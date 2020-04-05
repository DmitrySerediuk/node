const DbObj = require('../../common/db.memory.repository');

class TaskRepo extends DbObj {
  async getByBoardId(boardId) {
    const tasks = this.db.filter(e => {
      return e.boardId === boardId;
    });
    return tasks;
  }

  async cleanUserTask(userId) {
    this.db.forEach(e => {
      if (e.userId === userId) e.userId = null;
    });
    return true;
  }

  async deleteByBoardId(boardId) {
    const tasks = this.db.filter(e => {
      return e.boardId !== boardId;
    });
    this.db = tasks;
    return true;
  }
}

module.exports = TaskRepo;
