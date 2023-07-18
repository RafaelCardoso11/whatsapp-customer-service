import express from "express";
import routers from "../../routes";

import pinoHttp from "pino-http";
import logger from "../logger/pino";
const server = express();

server.use(express.json());
server.use(routers);
server.use(pinoHttp({ logger }));

const PORT = process.env.SERVER_PORT;

server.listen(PORT, () => {
  logger.info(`Server listening on port ${PORT}`);
});
