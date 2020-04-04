class dbObj {
  constructor(db, dbModel) {
    this.db = db;
    this.dbModel = dbModel;
  }

  async getAll() {
    return this.db;
  }

  async getById(id) {
    const idValue = this.db
      .map(e => {
        return e.id;
      })
      .indexOf(id);
    if (idValue !== -1) {
      return this.db[idValue];
    }
    return {};
  }

  async create(userData) {
    const newRow = new this.dbModel(userData);
    this.db.push(newRow);
    return newRow;
  }

  async update(id, objData) {
    const idForUpdate = this.db
      .map(e => {
        return e.id;
      })
      .indexOf(id);

    if (idForUpdate === -1) {
      return false;
    }

    for (const key in objData) {
      if (Object.prototype.hasOwnProperty.call(this.db[idForUpdate], key)) {
        this.db[idForUpdate][key] = objData[key];
      }
    }

    return this.db[idForUpdate];
  }

  async delete(id) {
    const idForDelete = this.db
      .map(e => {
        return e.id;
      })
      .indexOf(id);
    if (idForDelete === -1) {
      return false;
    }
    this.db.splice(idForDelete, 1);
    return true;
  }
}

module.exports = dbObj;
