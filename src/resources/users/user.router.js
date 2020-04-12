const router = require('express').Router();
const usersService = require('./user.service');
const taskService = require('../tasks/task.service');
const User = require('./user.model');
const createError = require('http-errors');
const { BAD_REQUEST, NOT_FOUND, OK, NO_CONTENT } = require('http-status-codes');

// router.route('/').get(async (req, res, next) => {
//     const users = await usersService.getAll();
//     res.status(OK).json(users.map(User.toResponse));
// });

router.route('/').get(async (req, res, next) => {
  try {
    const users = await usersService.getAll();
    res.status(OK).json(users.map(User.toResponse));
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const selectedUser = await usersService.getById(req.params.id);
    if (!selectedUser.id) {
      throw new createError(NOT_FOUND, 'User not found');
    } else {
      res.status(OK).json(User.toResponse(selectedUser));
    }
  } catch (err) {
    return next(err);
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    const newUser = await usersService.create(req.body);
    if (!newUser) {
      throw new createError(BAD_REQUEST, 'Bad user data');
    } else {
      res.status(OK).json(User.toResponse(newUser));
    }
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').put(async (req, res, next) => {
  try {
    const updateUser = await usersService.update(req.params.id, req.body);
    if (updateUser.id) {
      res.status(OK).json(User.toResponse(updateUser));
    } else {
      throw new createError(BAD_REQUEST, 'Bad user data');
    }
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    if (
      (await usersService.remove(req.params.id)) &&
      (await taskService.cleanUserTask(req.params.id))
    ) {
      res.status(OK).json(NO_CONTENT);
    } else {
      throw new createError(BAD_REQUEST, 'Bad user data');
    }
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
