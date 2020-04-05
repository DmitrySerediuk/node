const BoardRepo = require('./board.memory.repository');
const ObjService = require('../../common/obj.service');
const boardDb = require('./board.db');
const Board = require('./board.model');

class BoardService extends ObjService {}

const boardRepo = new BoardRepo(boardDb, Board);
const boardService = new BoardService(boardRepo);

module.exports = boardService;
