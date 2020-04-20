const router = require('express').Router();
const taskService = require('./task.service');
const Task = require('./task.model');
const createError = require('http-errors');
const { BAD_REQUEST, NOT_FOUND, OK, NO_CONTENT } = require('http-status-codes');
const catchError = require('../../common/catchError');

router.route('/:boardId/tasks').get(
  catchError(async (req, res) => {
    const tasks = await taskService.getByBoardId(req.params.boardId);
    res.status(OK).json(tasks.map(Task.toResponse));
  })
);

router.route('/:boardId/tasks/:taskId').get(
  catchError(async (req, res) => {
    const selectedTask = await taskService.getById(req.params.taskId);
    if (!selectedTask) {
      throw new createError(NOT_FOUND, 'Task not found');
    }
    res.status(OK).json(Task.toResponse(selectedTask));
  })
);

router.route('/:boardId/tasks').post(
  catchError(async (req, res) => {
    const newTask = await taskService.create(req.params.boardId, req.body);
    if (!newTask) {
      throw new createError(BAD_REQUEST, 'Bad user data');
    }

    res.status(OK).json(Task.toResponse(newTask));
  })
);

router.route('/:boardId/tasks/:taskId').put(
  catchError(async (req, res) => {
    const updateTask = await taskService.update(req.params.taskId, req.body);
    if (updateTask.id) {
      res.status(OK).json(Task.toResponse(updateTask));
    } else {
      throw new createError(BAD_REQUEST, 'Bad user data');
    }
  })
);

router.route('/:boardId/tasks/:taskId').delete(
  catchError(async (req, res) => {
    if (await taskService.remove(req.params.taskId)) {
      res.status(NO_CONTENT).send();
    } else {
      throw new createError(BAD_REQUEST, 'Bad user data');
    }
  })
);

module.exports = router;
