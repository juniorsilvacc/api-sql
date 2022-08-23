const http = require("http");
const { randomUUID } = require("crypto");

let users = [];
const server = http.createServer((request, response) => {
  // Cadastro de usuário

  // GET - Listar
  // POST - Adicionar
  // PUT - Atualizar
  // DELETE - Remover

  const METHOD = request.method;
  const URL = request.url;

  if (URL === "/users") {
    if (METHOD === "POST") {
      request.on("data", (data) => {
        const body = JSON.parse(data);
        const user = {
          id: randomUUID(),
          ...body,
        };

        users.push(user);

        return response.end(JSON.stringify(user));
      });
    }

    if (METHOD === "GET") {
      return response.end(JSON.stringify(users));
    }
  }
});

server.listen(3333, () => {
  console.log("Server listening on");
});
