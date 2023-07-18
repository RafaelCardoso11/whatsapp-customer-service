import { Message, Whatsapp, create } from "venom-bot";
import { MessageService } from "../../core/services/MessageService";
import { CommandsUseCase } from "../../core/usecases/commands";
import { ConsultantRepository } from "../repositories/Consultant";

import { extractTelephoneForIdTelephone } from "../../pipes/extractTelephoneForIdTelephone";
import { Consultant } from "../../core/entities/Consultant";

const CHAT_ID_STATUS = "status@broadcast";
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

  private configureMessageHandling() {
    this.client.onMessage((message: Message): void => {
      const notIsStatus = message.chatId !== CHAT_ID_STATUS;

      if (notIsStatus) {
        this.handleReceivedMessage(message);
      }
    });
  }

  private async handleReceivedMessage(message: Message) {
    const {
      sender: { id: idTelephone },
    } = message;

    const sender = new MessageService(this.client);
    const consultants = await this.fetchConsultants();

    if (consultants) {
      const telephoneClient = extractTelephoneForIdTelephone(idTelephone);
      const isConsultant = this.isConsultant(telephoneClient, consultants);

      const consultantWithClientCurrent = consultants.find(
        ({ clientCurrent }) => clientCurrent.number === telephoneClient
      );

      const isNewSupport = !consultantWithClientCurrent;

      if (isConsultant) {
        const initWithCommand = /^#\//;
        const isCommand = initWithCommand.test(message.content);

        if (isCommand) {
          const command = await this.commandsUseCase.executeCommand(
            isConsultant,
            message.content
          );
          this.client.sendText(idTelephone, command);
        } else {
          const consultantCurrent = consultants.find(
            ({ number }) => number === telephoneClient
          );
          if (consultantCurrent) {
            sender.sendMessageToClient(
              consultantCurrent.clientCurrent._id,
              message
            );
          } else {
            this.client.sendText(
              idTelephone,
              "_Você não está em um atendimento!_"
            );
          }
        }
      } else {
        if (isNewSupport) {
          if (await sender.startSupport(idTelephone)) {
            sender.sendMessageToConsultant(message);
          } else {
            console.error("Support not initialized");
          }
        } else {
          sender.sendMessageToConsultant(message);
        }
      }
    } else {
      console.log("Nenhum consultor cadastrado");
    }
  }

  private async fetchConsultants() {
    try {
      const consultantRepository = new ConsultantRepository();
      const consultants = await consultantRepository.getAll();
      return consultants;
    } catch (error) {
      console.error("Error updating consultants:", error);
    }
  }
  private isConsultant(
    telephoneClient: string,
    consultants: Consultant[]
  ): Consultant | undefined {
    const consultant = consultants.find(
      ({ number }) => number === telephoneClient
    );

    return consultant;
  }
}
