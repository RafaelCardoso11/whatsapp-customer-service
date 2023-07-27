import express from 'express';
import routers from './routes';

import { logger } from '../logger/logger';

const server = express();

server.use(express.json());
server.use(routers);

const PORT = process.env.SERVER_PORT;

server.listen(PORT, () => {
  logger.info(`Server listening on port ${PORT}`);
});
