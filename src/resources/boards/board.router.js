const router = require('express').Router();
const boardService = require('./board.service');
const taskService = require('../tasks/task.service');
const Board = require('./board.model');
const createError = require('http-errors');
const { BAD_REQUEST, NOT_FOUND, OK, NO_CONTENT } = require('http-status-codes');
const catchError = require('../../common/catchError');

router.route('/').get(
  catchError(async (req, res) => {
    const boards = await boardService.getAll();
    res.status(OK).json(boards.map(Board.toResponse));
  })
);

router.route('/:id').get(
  catchError(async (req, res) => {
    const selectedBoard = await boardService.getById(req.params.id);
    if (!selectedBoard) {
      throw new createError(NOT_FOUND, 'Task not found');
    }
    res.status(OK).json(Board.toResponse(selectedBoard));
  })
);

router.route('/').post(
  catchError(async (req, res) => {
    const newBoard = await boardService.create(req.body);
    if (!newBoard) {
      throw new createError(BAD_REQUEST, 'Bad user data');
    }

    res.status(OK).json(Board.toResponse(newBoard));
  })
);

router.route('/:id').put(
  catchError(async (req, res) => {
    const updateStatus = await boardService.update(req.params.id, req.body);
    if (!updateStatus) {
      throw new createError(BAD_REQUEST, 'Bad user data');
    }
    res.status(OK).json(updateStatus);
  })
);

router.route('/:id').delete(
  catchError(async (req, res) => {
    if (
      (await boardService.remove(req.params.id)) &&
      (await taskService.deleteByBoardId(req.params.id))
    ) {
      res.status(NO_CONTENT).send();
    } else {
      throw new createError(BAD_REQUEST, 'Bad user data');
    }
  })
);

module.exports = router;
