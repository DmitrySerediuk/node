const router = require('express').Router();
const usersService = require('./user.service');
const taskService = require('../tasks/task.service');
const User = require('./user.model');
const createError = require('http-errors');
const { BAD_REQUEST, NOT_FOUND, OK, NO_CONTENT } = require('http-status-codes');
const catchError = require('../../common/catchError');

router.route('/').get(
  catchError(async (req, res) => {
    const users = await usersService.getAll();
    res.status(OK).json(users.map(User.toResponse));
  })
);

router.route('/:id').get(
  catchError(async (req, res) => {
    const selectedUser = await usersService.getById(req.params.id);
    if (!selectedUser.id) {
      throw new createError(NOT_FOUND, 'User not found');
    } else {
      res.status(OK).json(User.toResponse(selectedUser));
    }
  })
);

router.route('/').post(
  catchError(async (req, res) => {
    const newUser = await usersService.create(req.body);
    if (!newUser) {
      throw new createError(BAD_REQUEST, 'Bad user data');
    }
    res.status(OK).json(User.toResponse(newUser));
  })
);

router.route('/:id').put(
  catchError(async (req, res) => {
    const updateUser = await usersService.update(req.params.id, req.body);
    if (updateUser.id) {
      res.status(OK).json(User.toResponse(updateUser));
    } else {
      throw new createError(BAD_REQUEST, 'Bad user data');
    }
  })
);

router.route('/:id').delete(
  catchError(async (req, res) => {
    if (
      (await usersService.remove(req.params.id)) &&
      (await taskService.cleanUserTask(req.params.id))
    ) {
      res.status(OK).json(NO_CONTENT);
    } else {
      throw new createError(BAD_REQUEST, 'Bad user data');
    }
  })
);

module.exports = router;
