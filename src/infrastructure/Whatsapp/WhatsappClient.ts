import { Message, Whatsapp, create } from "venom-bot";
import { isEmpty } from "lodash";
import { MessageService } from "../../aplications/services/MessageService";
import { CommandsUseCase } from "../../aplications/usecases/commands";

export let idClient = "";

interface IConsultant {
  id: string;
  name: string;
  idClientCurrent: string;
}

const consultantsDataBase: IConsultant[] = [
  {
    id: "559196320038@c.us",
    name: "Rafael Cardoso",
    idClientCurrent: "",
  },
];

const chatIDStatus = "status@broadcast";
export class WhatsAppClient {
  private client: Whatsapp;
  private commandsUseCase: CommandsUseCase;

  constructor(private readonly commands: CommandsUseCase) {
    this.commandsUseCase = commands;
  }

  async initialize() {
    try {
      const client = await create({
        session: "fones-belem",
      });
      this.client = client;
      this.configureMessageHandling();
    } catch (error) {
      console.error("Error during application bootstrap", error);
    }
  }

  private configureMessageHandling(): void {
    this.client.onMessage((message) => {
      const notIsStatus = message.chatId !== chatIDStatus;

      const isRebeca = message.sender.id === "559181702882@c.us";

      const consultants = consultantsDataBase.map(({ id }) => id);
      const isConsultant = consultants.includes(message.sender.id);
      if ((notIsStatus && isRebeca) || isConsultant)
        this.handleReceivedMessage(message);
    });
  }
  private async handleReceivedMessage(message: Message) {
    const {
      sender: { id },
      chatId,
    } = message;
    const consultants = consultantsDataBase.map(({ id }) => id);

    const sender = new MessageService(this.client);
    const isConsultant = consultants.includes(id);
    const isNewSupport = isEmpty(idClient) && id === chatId && !isConsultant;

    const initWithCommand = /^#\//;
    const isCommand = initWithCommand.test(message.content);

    if (isNewSupport) {
      if (await sender.startSupport(id)) {
        sender.sendMessageToConsultant(message);
        idClient = id;
      } else {
        console.error("Support not initialized");
      }
    }
    if (isConsultant && idClient && !isCommand) {
      sender.sendMessageToClient(idClient, message);
    }
    if (isCommand && isConsultant) {
      this.client.sendText(
        id,
        this.commandsUseCase.executeCommand(idClient, message.content)
      );
    }
  }
}
