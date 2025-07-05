require('dotenv').config();
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`Server is Running on Port ${PORT}`);
});
