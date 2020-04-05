const TaskRepo = require('./task.memory.repository');
const ObjService = require('../../common/obj.service');
const taskDb = require('./task.db');
const Task = require('./task.model');

class TaskService extends ObjService {
  async getByBoardId(boardId) {
    const tasks = await this.objRepo.getByBoardId(boardId);
    return tasks.map(this.objRepo.dbModel.toResponse);
  }

  async getByTaskId(boardId, taskId) {
    return this.objRepo.dbModel.toResponse(await this.objRepo.getById(taskId));
  }

  create(boardId, data) {
    data.boardId = boardId;
    return super.create(data);
  }

  async cleanUserTask(userId) {
    return await this.objRepo.cleanUserTask(userId);
  }
  async deleteByBoardId(boardId) {
    return await this.objRepo.deleteByBoardId(boardId);
  }
}

const taskRepo = new TaskRepo(taskDb, Task);
const taskService = new TaskService(taskRepo);

module.exports = taskService;
