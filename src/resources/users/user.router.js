const router = require('express').Router();
const usersService = require('./user.service');
const taskService = require('../tasks/task.service');
const User = require('./user.model');
const ERROR = require('../errors/errors');
const errorHandle = require('../errors/errorHandle');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const selectedUser = await usersService.getById(req.params.id);
  if (!selectedUser.id) {
    errorHandle(res, ERROR.NOT_FOUND);
  } else {
    res.json(User.toResponse(selectedUser));
  }
});

router.route('/').post(async (req, res) => {
  const newUser = await usersService.create(req.body);
  if (!newUser) {
    errorHandle(res, ERROR.BAD_REQUEST);
  } else {
    res.json(User.toResponse(newUser));
  }
});

router.route('/:id').put(async (req, res) => {
  const updateUser = await usersService.update(req.params.id, req.body);
  if (updateUser.id) {
    res.json(User.toResponse(updateUser));
  } else {
    errorHandle(res, ERROR.BAD_REQUEST);
  }
});

router.route('/:id').delete(async (req, res) => {
  if (
    (await usersService.remove(req.params.id)) &&
    (await taskService.cleanUserTask(req.params.id))
  ) {
    res.json(ERROR.NO_ERROR.MESSAGE);
  } else {
    errorHandle(res, ERROR.BAD_REQUEST);
  }
});

module.exports = router;
