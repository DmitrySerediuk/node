const router = require('express').Router();
const columnService = require('./column.service');
const ERROR = require('../errors/errors');
const errorHandle = require('../errors/errorHandle');

router.route('/').get(async (req, res) => {
  const boards = await columnService.getAll();
  res.json(boards);
});

router.route('/:id').get(async (req, res) => {
  const selectedBoard = await columnService.getById(req.params.id);
  if (!selectedBoard.id) {
    errorHandle(res, ERROR.NOT_FOUND);
  } else {
    res.json(selectedBoard);
  }
});

router.route('/').post(async (req, res) => {
  const newBoard = await columnService.create(req.body);
  if (!newBoard) {
    errorHandle(res, ERROR.BAD_REQUEST);
  } else {
    res.json(newBoard);
  }
});

router.route('/:id').put(async (req, res) => {
  const updateStatus = await columnService.update(req.params.id, req.body);
  if (updateStatus) {
    res.json(ERROR.NO_ERROR.MESSAGE);
  } else {
    errorHandle(res, ERROR.BAD_REQUEST);
  }
});

router.route('/:id').delete(async (req, res) => {
  if (await columnService.delete(req.params.id)) {
    res.json(ERROR.NO_ERROR.MESSAGE);
  } else {
    errorHandle(res, ERROR.BAD_REQUEST);
  }
});

module.exports = router;
