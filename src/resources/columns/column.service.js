const ColumnRepo = require('./column.memory.repository');
const ObjService = require('../../common/obj.service');
const columnDb = require('./column.db');
const Column = require('./column.model');

class ColumnService extends ObjService {}

const columnRepo = new ColumnRepo(columnDb, Column);
const columnService = new ColumnService(columnRepo);

module.exports = columnService;
