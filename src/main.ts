import dotenv from "dotenv";
dotenv.config();

import { CommandsUseCase } from "./core/usecases/commands";
import { WhatsAppClient } from "./infra/venom/WhatsappClient";
import connectMongoDB from "./infra/odm/mongoose";
import mongoURI from "./infra/database/mongoDB";
import "./infra/http/express";
import { logger } from "./infra/logger/logger";

async function startApp() {
  try {
    await connectMongoDB(mongoURI);

    const commands = new CommandsUseCase();
    const app = new WhatsAppClient(commands);

    app.initialize();
  } catch (error) {
    logger.error("Error to initialize App:", error);
  }
}

startApp();
