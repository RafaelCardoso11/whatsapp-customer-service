import { IMessage } from '../../core/entities/Message';
import { logger } from '../logger/logger';
import { IWhatsappClient } from '../../adapters/interfaces/whatsappClient';
import { Client } from '../../core/entities/Client';
import { Consultant } from '../../core/entities/Consultant';
import { WhatsappClientDependencies } from './ClientDependencies';
import ResponseEmitterSingleton from '../emitters/ResponseEmitterSingleton';
import { ECommand } from '../../enums/ECommand';
import { LanguageManagerSingleton } from '../language';

class WhatsappClient implements IWhatsappClient {
  constructor(private readonly dependencies: WhatsappClientDependencies) {}

  async initialize(): Promise<void> {
    try {
      await this.dependencies.client.initialize(process.env.SERVER_SESSION_WS as string);
      await this.onMessage();
    } catch (error) {
      logger.error(LanguageManagerSingleton.translate('errors:WhatsappClient.INITIALIZE', { error }));
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
    logger.info(
      LanguageManagerSingleton.translate('logger:WhatsappClient.NEW_MESSAGE_TO_CONSULTANT', {
        consultantName: consultant.name,
      })
    );

    const initWithCommand = /^#\//;
    const isCommand = initWithCommand.test(message.content);

    ResponseEmitterSingleton.emit(`message:${consultant.telephone}`, message.content);

    if (isCommand) {
      const executed = await this.dependencies.commandsUseCase.executeCommand(consultant, message.content);

      if (executed) {
        logger.info(
          LanguageManagerSingleton.translate('logger:WhatsappClient.CONSULTANT_EXECUTING_COMMAND', {
            consultantName: consultant.name,
            command: message.content,
          })
        );
        switch (message.content) {
          case ECommand.CloseSession:
            this.dependencies.queueAttendimentUseCase.removeQueueAttendimentAndRemoveClientCurrent(consultant._id);
            break;
        }
        return;
      }
    } else {
      if (consultant.clientCurrent?.telephone) {
        await this.dependencies.senderUseCase.sendFormattedMessageToClient(
          consultant.clientCurrent.telephone,
          consultant.name,
          message.content
        );
      }
    }
  }
  private async handleClientMessage(message: IMessage) {
    const {
      sender: { telephone, name: nameSave, pushname: name },
      content,
    } = message;
    logger.info(
      LanguageManagerSingleton.translate('logger:WhatsappClient.NEW_MESSAGE_TO_CLIENT', { clientName: name })
    );
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
      const clientInQueueAttendiment = await this.dependencies.queueAttendimentUseCase.clientInQueueAttendiment(
        telephone
      );
      if (!clientInQueueAttendiment) {
        await this.dependencies.senderUseCase.newAttendiment(telephone);
        await this.handleNewClientMessage(nameSave, name, telephone, content);
      }
      await this.dependencies.queueAttendimentUseCase.saveMessageInAttendiment(telephone, content);
      logger.info(
        LanguageManagerSingleton.translate('logger:WhatsappClient.CLIENT_WAIT_ATTENDIMENT_IN_QUEUE', {
          clientName: name,
        })
      );
    }
  }
  private async handleNewClientMessage(nameSave: string, name: string, telephone: string, contentMessage: string) {
    const clientCurrent: Client = {
      nameSave,
      name,
      telephone,
    };
    logger.info(
      LanguageManagerSingleton.translate('logger:WhatsappClient.NEW_CLIENT', {
        clientName: name,
      })
    );
    const consultantAvaiable = await this.dependencies.consultantUseCase.findConsultantAvailable();

    if (consultantAvaiable) {
      await this.dependencies.consultantUseCase.updateConsultantAvailableWithNewClient(
        consultantAvaiable._id,
        clientCurrent
      );
      await this.dependencies.senderUseCase.sendFormattedMessageToConsultantForNewClient(
        consultantAvaiable.telephone,
        clientCurrent.name
      );
      await this.dependencies.senderUseCase.sendFormattedMessageToConsultant(
        clientCurrent,
        contentMessage,
        consultantAvaiable.telephone
      );
    } else {
      const isAddToQueue = await this.dependencies.queueAttendimentUseCase.add(clientCurrent, contentMessage);
      if (isAddToQueue)
        logger.info(
          LanguageManagerSingleton.translate('logger:WhatsappClient.CLIENT_ADD_IN_QUEUE_ATTENDIMENT', {
            clientName: name,
          })
        );
    }
  }
}

export default WhatsappClient;
