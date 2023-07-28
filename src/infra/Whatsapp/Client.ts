import { IMessage } from '../../core/entities/Message';
import { logger } from '../logger/logger';
import { IWhatsappClient } from '../../adapters/interfaces/whatsappClient';
import { Client } from '../../core/entities/Client';
import { Consultant } from '../../core/entities/Consultant';
import { WhatsappClientDependencies } from './ClientDependencies';
import { ESenderType } from '../../enums/ESenderType';

class WhatsappClient implements IWhatsappClient {
  constructor(private readonly dependencies: WhatsappClientDependencies) {}

  async initialize(): Promise<void> {
    try {
      await this.dependencies.client.initialize(process.env.SERVER_SESSION_WS as string);
      await this.onMessage();
    } catch (error) {
      logger.error('Error during application bootstrap', error);
    }
  }
  async onMessage(): Promise<void> {
    await this.dependencies.client.onMessage((message: IMessage) => {
      const isMessage = /\d{12}@c.us/.test(message.chatId);
      if (isMessage) {
        this.handleReceivedMessage(message);
      }
    });
  }

  private async handleReceivedMessage(message: IMessage) {
    const {
      sender: { telephone },
    } = message;
    const consultant = await this.dependencies.consultantUseCase.CheckIsConsultantByTelephone(telephone);

    if (consultant) {
      await this.handleConsultantMessage(consultant, message);
    } else {
      await this.handleClientMessage(message);
    }
  }
  private async handleConsultantMessage(consultant: Consultant, message: IMessage) {
    logger.info('NOVA MENSAGEM DO CONSULTOR - ' + consultant.name);

    const initWithCommand = /^#\//;
    const isCommand = initWithCommand.test(message.content);

    if (isCommand) {
      await this.dependencies.commandsUseCase.executeCommand(consultant, message.content);
    } else {
      await this.dependencies.senderUseCase.sendFormattedMessageToClient(
        String(consultant.clientCurrent?.telephone),
        consultant.name,
        message.content
      );
    }
  }
  private async handleClientMessage(message: IMessage) {
    const {
      sender: { telephone, name: nameSave, pushname: name },
      content,
    } = message;
    logger.info('NOVA MENSAGEM DO CLIENT - ' + name);
    const consultorInAttendimentWithClient = await this.dependencies.consultantUseCase.findByTelephoneClient(telephone);

    if (consultorInAttendimentWithClient) {
      const client: Client = {
        nameSave,
        name,
        telephone,
      };
      await this.dependencies.senderUseCase.sendFormattedMessageToConsultant(
        client,
        content,
        consultorInAttendimentWithClient.telephone
      );
    } else {
      const clientInQueueAttendiment = await this.dependencies.queueAttendimentUseCase.clientInAttendiment(telephone);
      if (!clientInQueueAttendiment) {
        await this.dependencies.senderUseCase.newAttendiment(telephone);
        await this.handleNewClientMessage(nameSave, name, telephone, content);
      }
      await this.dependencies.queueAttendimentUseCase.saveMessageInAttendiment(telephone, content);
      logger.info(`CLIENTE ${name} AGUARDANDO ATENDIMENTO NA FILA`);
    }
  }
  private async handleNewClientMessage(nameSave: string, name: string, telephone: string, contentMessage: string) {
    const clientCurrent: Client = {
      nameSave,
      name,
      telephone,
    };
    logger.info('NOVO CLIENTE - ' + name);
    const consultantAvaiable = await this.dependencies.consultantUseCase.findConsultantAvailable();

    if (consultantAvaiable) {
      await this.dependencies.consultantUseCase.updateConsultantAvailableWithNewClient(
        consultantAvaiable._id as string,
        clientCurrent
      );
      await this.dependencies.senderUseCase.sendFormattedMessageToConsultantForNewClient(
        ESenderType.TEXT,
        consultantAvaiable.telephone
      );
      await this.dependencies.senderUseCase.sendFormattedMessageToConsultant(
        clientCurrent,
        contentMessage,
        consultantAvaiable.telephone
      );
    } else {
      const isAddToQueue = await this.dependencies.queueAttendimentUseCase.add(clientCurrent, contentMessage);
      if (isAddToQueue) logger.info(`CLIENT ${name} ADICIONADO NA FILA DE ATENDIMENTO`);
    }
  }
}

export default WhatsappClient;
