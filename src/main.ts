import dotenv from "dotenv";
dotenv.config();
import "./infra/http/express";

import { CommandsUseCase } from "./core/usecases/commands";
import { WhatsAppClient } from "./infra/Whatsapp/venom";
import { logger } from "./infra/logger/logger";

import mongoURI from "./infra/database/mongoDB";
import Odm from "./infra/odm/odm";

async function startApp() {
  try {
    await Odm.connection(mongoURI);

    const commands = new CommandsUseCase();
    const app = new WhatsAppClient(commands);

    app.initialize();
  } catch (error) {
    logger.error("Error to initialize App:", error);
  }
}

startApp();
