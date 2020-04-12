const router = require('express').Router();
const taskService = require('./task.service');
const Task = require('./task.model');
const createError = require('http-errors');
const { BAD_REQUEST, NOT_FOUND, OK, NO_CONTENT } = require('http-status-codes');

router.route('/:boardId/tasks').get(async (req, res, next) => {
  try {
    const tasks = await taskService.getByBoardId(req.params.boardId);
    res.status(OK).json(tasks.map(Task.toResponse));
  } catch (err) {
    return next(err);
  }
});

router.route('/:boardId/tasks/:taskId').get(async (req, res, next) => {
  try {
    const selectedTask = await taskService.getById(req.params.taskId);
    if (!selectedTask.id) {
      throw new createError(NOT_FOUND, 'Task not found');
    } else {
      res.status(OK).json(Task.toResponse(selectedTask));
    }
  } catch (err) {
    return next(err);
  }
});

router.route('/:boardId/tasks').post(async (req, res, next) => {
  try {
    const newTask = await taskService.create(req.params.boardId, req.body);
    if (!newTask) {
      throw new createError(BAD_REQUEST, 'Bad user data');
    } else {
      res.status(OK).json(Task.toResponse(newTask));
    }
  } catch (err) {
    return next(err);
  }
});

router.route('/:boardId/tasks/:taskId').put(async (req, res, next) => {
  try {
    const updateTask = await taskService.update(req.params.taskId, req.body);
    if (updateTask.id) {
      res.status(OK).json(Task.toResponse(updateTask));
    } else {
      throw new createError(BAD_REQUEST, 'Bad user data');
    }
  } catch (err) {
    return next(err);
  }
});

router.route('/:boardId/tasks/:taskId').delete(async (req, res, next) => {
  try {
    if (await taskService.remove(req.params.taskId)) {
      res.status(NO_CONTENT).send();
    } else {
      throw new createError(BAD_REQUEST, 'Bad user data');
    }
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
