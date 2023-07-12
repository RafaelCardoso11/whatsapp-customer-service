
import { CommandsUseCase } from "./aplications/usecases/commands";
import { WhatsAppClient } from "./infrastructure/Whatsapp/WhatsappClient";

const commands = new CommandsUseCase()
const app = new WhatsAppClient(commands);

app.initialize();
