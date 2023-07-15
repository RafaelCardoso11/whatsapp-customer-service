import { CommandsUseCase } from "./aplications/usecases/commands";
import { WhatsAppClient } from "./infrastructure/Whatsapp/WhatsappClient";
import { main } from "./infrastructure/database/connection/conn";
import express from "express";
import routers from "./routes";

const commands = new CommandsUseCase();

const app = new WhatsAppClient(commands);

const server = express();
server.use(express.json());
server.use(routers);

// // Middleware para lidar com erros
// server.use((err, req, res, next) => {
//   console.error("Error:", err);
//   res.status(500).json({ error: "Internal Server Error" });
// });

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

main();
app.initialize();
