const { randomUUID } = require("crypto");
const UserRepository = require("./user.repository");

class User {
  constructor() {
    this.users = [];
    this.userRepository = new UserRepository();
  }

  async create(body) {
    const user = await this.userRepository.create(body);

    return user;
  }

  findAll() {
    return this.users;
  }

  update(body, id) {
    // Indetificar qual id do usuário quero alterar
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex <= -1) {
      throw new Error("Usuário não encontrado");
    }

    // Alterar o usuário (ID permanece)
    this.users[userIndex] = {
      id,
      ...body,
    };
  }
}

module.exports = new User();
