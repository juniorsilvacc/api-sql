const http = require("http");
const user = require("./user");

let users = [];

const server = http.createServer((request, response) => {
  const METHOD = request.method;
  const URL = request.url;

  if (URL.startsWith("/users")) {
    if (METHOD === "POST") {
      request.on("data", async (data) => {
        const body = JSON.parse(data);
        const result = await user.create(body);
        return response.end(JSON.stringify(result));
      });
    }

    if (METHOD === "GET") {
      const result = user.findAll();
      return response.end(JSON.stringify(result));
    }

    if (METHOD === "PUT") {
      const paramsSprit = URL.split("/");
      const id = paramsSprit[2];

      // Receber as informações que quero alterar do body
      request.on("data", async (data) => {
        const body = JSON.parse(data);

        try {
          await user.update(body, id);

          return response.end(
            JSON.stringify({
              message: "Usuário alterado com sucesso",
            })
          );
        } catch (err) {
          console.log("error", err);
          return response.end(
            JSON.stringify({
              message: err.message,
            })
          );
        }
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
