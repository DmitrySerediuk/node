const uuid = require('uuid');

class Board {
  constructor({ id = uuid(), title = 'TITLE', columns = 'title' } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  static toResponse(user) {
    const { id, title, columns } = user;
    return { id, title, columns };
  }
}

module.exports = Board;
