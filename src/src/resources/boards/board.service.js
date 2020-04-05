const BoardRepo = require('./board.memory.repository');
const ObjService = require('../../common/obj.service');
const boardDb = require('./board.db');
const Board = require('./board.model');

class BoardService extends ObjService {
  // create(data){
  //     // if (!data.title || !data.columns)
  //     //     return undefined;
  //     let res  = super.create(data);
  //     console.log(res);
  //     return res;
  //     return super.create(data);
  // }
  // update(id, data){
  //     if (!id || !data.title || !data.columns)
  //         return undefined;
  //     return super.update(id, data);
  // }
}

const boardRepo = new BoardRepo(boardDb, Board);
const boardService = new BoardService(boardRepo);

module.exports = boardService;
