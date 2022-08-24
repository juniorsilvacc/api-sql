const { client } = require("./database/db");
const { randomUUID } = require("crypto");

class UserRepository {
  constructor() {
    this.client = client;
  }

  async create({ name, username, email }) {
    const id = randomUUID();

    await this.client.query(
      "INSERT INTO users (id, name, username, email) VALUES ($1, $2, $3, $4)",
      [id, name, username, email]
    );

    const user = Object.assign({
      id,
      name,
      username,
      email,
    });

    return user;
  }
}

module.exports = UserRepository;
