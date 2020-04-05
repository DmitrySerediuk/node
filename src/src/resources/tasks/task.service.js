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
    // if (boardId === undefined || data.title === undefined || data.order === undefined || data.description === undefined)
    //     return undefined;
    data.boardId = boardId;
    return super.create(data);
  }

  // update(id, data){
  //     if (data.title === undefined || data.order === undefined || data.description === undefined)
  //         return undefined;
  //     const res = super.update(id, data)
  //     return super.update(id, res);
  // }

  async cleanUserTask(userId) {
    // if (userId === undefined)
    //     return undefined;
    return await this.objRepo.cleanUserTask(userId);
  }
  async deleteByBoardId(boardId) {
    // if (boardId === undefined)
    //     return false;
    return await this.objRepo.deleteByBoardId(boardId);
  }
}

const taskRepo = new TaskRepo(taskDb, Task);
const taskService = new TaskService(taskRepo);

module.exports = taskService;
