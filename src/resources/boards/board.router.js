const router = require('express').Router();
const boardService = require('./board.service');
const taskService = require('../tasks/task.service');
const ERROR = require('../errors/errors');
const errorHandle = require('../errors/errorHandle');

router.route('/').get(async (req, res) => {
  const boards = await boardService.getAll();
  res.json(boards);
});

router.route('/:id').get(async (req, res) => {
  const selectedBoard = await boardService.getById(req.params.id);
  if (!selectedBoard.id) {
    errorHandle(res, ERROR.NOT_FOUND);
  } else {
    res.json(selectedBoard);
  }
});

router.route('/').post(async (req, res) => {
  const newBoard = await boardService.create(req.body);
  if (!newBoard) {
    errorHandle(res, ERROR.BAD_REQUEST);
  } else {
    res.json(newBoard);
  }
});

router.route('/:id').put(async (req, res) => {
  const updateStatus = await boardService.update(req.params.id, req.body);
  if (updateStatus) {
    res.json(ERROR.NO_ERROR.MESSAGE);
  } else {
    errorHandle(res, ERROR.BAD_REQUEST);
  }
});

router.route('/:id').delete(async (req, res) => {
  if (
    (await boardService.delete(req.params.id)) &&
    (await taskService.deleteByBoardId(req.params.id))
  ) {
    res.json(ERROR.NO_ERROR.MESSAGE);
  } else {
    errorHandle(res, ERROR.BAD_REQUEST);
  }
});

module.exports = router;
