const { client } = require("../database/db");
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

  async findAll() {
    const { rows } = await this.client.query("SELECT * FROM users");

    return rows;
  }

  async update({ name, username, email }, id) {
    const query =
      'UPDATE users SET "name" = $1, "username" = $2, "email" = $3 WHERE "id" = $4';
    await this.client.query(query, [name, username, email, id]);
  }

  async findById(id) {
    const { rows } = await this.client.query(
      "SELECT * FROM users WHERE id = $1 LIMIT 1",
      [id]
    );

    if (rows.length > 0) {
      return rows[0];
    }

    return null;
  }
}

module.exports = UserRepository;
