class ObjService {
  constructor(objRepo) {
    this.objRepo = objRepo;
  }

  async getAll() {
    const rows = await this.objRepo.getAll();
    return rows.map(this.objRepo.dbModel.toResponse);
  }

  async getById(id) {
    return this.objRepo.dbModel.toResponse(await this.objRepo.getById(id));
  }

  async create(data) {
    return this.objRepo.dbModel.toResponse(await this.objRepo.create(data));
  }

  async update(id, data) {
    if (!id) {
      return false;
    }
    return this.objRepo.dbModel.toResponse(await this.objRepo.update(id, data));
  }

  async delete(id) {
    if (!id) {
      return false;
    }
    return this.objRepo.dbModel.toResponse(await this.objRepo.delete(id));
  }
}

module.exports = ObjService;
