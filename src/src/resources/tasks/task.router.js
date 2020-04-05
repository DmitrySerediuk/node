const router = require('express').Router();
const taskService = require('./task.service');
const ERROR = require('../errors/errors');
const errorHandle = require('../errors/errorHandle');

router.route('/:boardId/tasks').get(async (req, res) => {
  const users = await taskService.getByBoardId(req.params.boardId);
  res.json(users);
});

router.route('/:boardId/tasks/:taskId').get(async (req, res) => {
  const selectedTask = await taskService.getById(
    req.params.boardId,
    req.params.taskId
  );
  if (!selectedTask.id) {
    errorHandle(res, ERROR.NOT_FOUND);
  } else {
    res.json(selectedTask);
  }
});

router.route('/:boardId/tasks').post(async (req, res) => {
  const newUser = await taskService.create(req.params.boardId, req.body);
  if (!newUser) {
    errorHandle(res, ERROR.BAD_REQUEST);
  } else {
    res.json(newUser);
  }
});

router.route('/:boardId/tasks/:taskId').put(async (req, res) => {
  const updateUser = await taskService.update(req.params.taskId, req.body);
  if (updateUser.id) {
    res.json(updateUser);
  } else {
    errorHandle(res, ERROR.BAD_REQUEST);
  }
});

router.route('/:boardId/tasks/:taskId').delete(async (req, res) => {
  if (await taskService.delete(req.params.taskId)) {
    res.json(ERROR.NO_ERROR.MESSAGE);
  } else {
    errorHandle(res, ERROR.BAD_REQUEST);
  }
});

module.exports = router;
