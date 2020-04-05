const userRepObj = require('./user.memory.repository');
const ObjService = require('../../common/obj.service');
const userDb = require('./user.db');
const User = require('./user.model');

class UserService extends ObjService {}

const usersRepo = new userRepObj(userDb, User);
const userService = new UserService(usersRepo);

module.exports = userService;
