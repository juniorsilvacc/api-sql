const { Client } = require("pg");

const client = new Client({
  host: "localhost",
  user: "postgres",
  password: "postgres",
  database: "api_sql",
  port: 5432,
});

client.connect();

module.exports = {
  client,
};
