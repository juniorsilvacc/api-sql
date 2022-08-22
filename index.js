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
});

server.listen(3333, () => {
  console.log("Server listening on");
});
