import { CommandsUseCase } from "./core/usecases/commands";
import "./infra/http/express";

import { WhatsAppClient } from "./infra/venom/WhatsappClient";
import mongoURI from "./infra/database/mongoDB";
import connectMongoDB from "./infra/odm/mongoose";

async function startApp() {
  try {
    await connectMongoDB(mongoURI);

    const commands = new CommandsUseCase();
    const app = new WhatsAppClient(commands);

    app.initialize();
  } catch (error) {
    console.error("Error to initialize App:", error);
  }
}

startApp();
