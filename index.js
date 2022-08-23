const http = require("http");
const { randomUUID } = require("crypto");

let users = [];
const server = http.createServer((request, response) => {
  const METHOD = request.method;
  const URL = request.url;

  if (URL.startsWith("/users")) {
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

    if (METHOD === "PUT") {
      const paramsSprit = URL.split("/");
      const id = paramsSprit[2];

      // Receber as informações que quero alterar do body
      request
        .on("data", (data) => {
          const body = JSON.parse(data);

          // Indetificar qual id do usuário quero alterar
          const userIndex = users.findIndex((user) => user.id === id);

          if (userIndex <= -1) {
            return response.end(
              JSON.stringify({
                message: "Usuário não encontrado",
              })
            );
          }

          // Alterar o usuário (ID permanece)
          users[userIndex] = {
            id,
            ...body,
          };
        })
        .on("end", () => {
          // Retornar usuário alterado
          return response.end(
            JSON.stringify({
              message: "Usuário alterado com sucesso",
            })
          );
        });
    }
  }
});

server.listen(3333, () => {
  console.log("Server listening on");
});

process.on("uncaughtException", (err) => {
  console.log(`Error no servidor ${err}`);
});
