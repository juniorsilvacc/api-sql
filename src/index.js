const http = require("http");
const handler = require("./routes/handle-routes");

const server = http.createServer(handler);

server.listen(3333, () => {
  console.log("Server listening on");
});

process.on("uncaughtException", (err) => {
  console.log(`Error no servidor ${err}`);
});
