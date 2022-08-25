const { randomUUID } = require("crypto");
const UserRepository = require("../repositories/user-repository");

class User {
  constructor() {
    this.users = [];
    this.userRepository = new UserRepository();
  }

  async create(body) {
    const user = await this.userRepository.create(body);

    return user;
  }

  async findAll() {
    return this.userRepository.findAll();
  }

  async update(body, id) {
    const userExists = await this.userRepository.findById(id);

    if (!userExists) {
      throw new Error("Usuário não encontrado");
    }

    await this.userRepository.update(body, id);
  }
}

module.exports = new User();
