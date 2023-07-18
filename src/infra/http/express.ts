import express from "express";
import routers from "../../routes";

const server = express();

server.use(express.json());
server.use(routers);

const PORT = process.env.SERVER_PORT;

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
