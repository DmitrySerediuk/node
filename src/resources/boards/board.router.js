const router = require('express').Router();
const boardService = require('./board.service');
const taskService = require('../tasks/task.service');
const Board = require('./board.model');
const createError = require('http-errors');
const { BAD_REQUEST, NOT_FOUND, OK, NO_CONTENT } = require('http-status-codes');

router.route('/').get(async (req, res, next) => {
  try {
    const boards = await boardService.getAll();
    res.status(OK).json(boards.map(Board.toResponse));
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const selectedBoard = await boardService.getById(req.params.id);
    if (!selectedBoard) {
      throw new createError(NOT_FOUND, 'Task not found');
    } else {
      res.status(OK).json(Board.toResponse(selectedBoard));
    }
  } catch (err) {
    console.log('errr');
    return next(err);
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    const newBoard = await boardService.create(req.body);
    if (!newBoard) {
      throw new createError(BAD_REQUEST, 'Bad user data');
    } else {
      res.status(OK).json(Board.toResponse(newBoard));
    }
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').put(async (req, res, next) => {
  try {
    const updateStatus = await boardService.update(req.params.id, req.body);
    if (updateStatus) {
      res.status(OK).json(updateStatus);
    } else {
      throw new createError(BAD_REQUEST, 'Bad user data');
    }
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    // const result = await boardService.remove(req.params.id);
    // console.log(result);
    if (
      (await boardService.remove(req.params.id)) &&
      (await taskService.deleteByBoardId(req.params.id))
      // await boardService.remove(req.params.id)
      // result
    ) {
      res.status(NO_CONTENT).send();
    } else {
      throw new createError(BAD_REQUEST, 'Bad user data');
    }
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
