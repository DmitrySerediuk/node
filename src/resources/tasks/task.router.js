const router = require('express').Router();
const taskService = require('./task.service');
const Task = require('./task.model');
const ERROR = require('../errors/errors');
const errorHandle = require('../errors/errorHandle');

router.route('/:boardId/tasks').get(async (req, res) => {
  const tasks = await taskService.getByBoardId(req.params.boardId);
  res.json(tasks.map(Task.toResponse));
});

router.route('/:boardId/tasks/:taskId').get(async (req, res) => {
  const selectedTask = await taskService.getById(req.params.taskId);
  if (!selectedTask.id) {
    errorHandle(res, ERROR.NOT_FOUND);
  } else {
    res.json(Task.toResponse(selectedTask));
  }
});

router.route('/:boardId/tasks').post(async (req, res) => {
  const newTask = await taskService.create(req.params.boardId, req.body);
  if (!newTask) {
    errorHandle(res, ERROR.BAD_REQUEST);
  } else {
    res.json(Task.toResponse(newTask));
  }
});

router.route('/:boardId/tasks/:taskId').put(async (req, res) => {
  const updateTask = await taskService.update(req.params.taskId, req.body);
  if (updateTask.id) {
    res.json(Task.toResponse(updateTask));
  } else {
    errorHandle(res, ERROR.BAD_REQUEST);
  }
});

router.route('/:boardId/tasks/:taskId').delete(async (req, res) => {
  if (await taskService.remove(req.params.taskId)) {
    res.json(ERROR.NO_ERROR.MESSAGE);
  } else {
    errorHandle(res, ERROR.BAD_REQUEST);
  }
});

module.exports = router;
