const userRepObj = require('./user.memory.repository');
const ObjService = require('../../common/obj.service');
const userDb = require('./user.db');
const User = require('./user.model');

class UserService extends ObjService {
  // create(data){
  //     // if (!data.name || !data.login || !data.password)
  //     //     return undefined;
  //     return super.create(data);
  // }
  // update(id, data){
  //     if (!data.name || !data.login || !data.password)
  //         return undefined;
  //     return super.update(id, data);
  // }
}

const usersRepo = new userRepObj(userDb, User);
const userService = new UserService(usersRepo);

module.exports = userService;

// const getAll = async () => {
//     const users = await usersRepo.getAll();
//     return users.map(User.toResponse);
// };

// const getUserById = async (id) => {
//     return User.toResponse(await usersRepo.getById(id));
// };

// const createUser = async (userData) => {
//     if (!userData.name || !userData.login || !userData.password)
//         return undefined;
//     const newUser = await usersRepo.create(userData);
//     return User.toResponse(newUser);
// };

// const updateUser = async (id, userData) => {
//     if (!userData.name || !userData.login || !userData.password)
//         return undefined;
//     return User.toResponse(await usersRepo.update(id, userData));
// };

// const deleteUser = (id) => usersRepo.delete(id);

// module.exports = { getAll, getUserById, createUser, updateUser, deleteUser };
