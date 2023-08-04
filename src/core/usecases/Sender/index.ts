import { ESenderType } from '../../../enums/ESenderType';
import { LanguageManagerSingleton } from '../../../infra/language';
import { Sender } from '../../../infra/whatsapp/Sender';
import { Client } from '../../entities/Client';

export class SenderUseCase {
  constructor(private readonly sender: Sender) {}

  private async send(messageType: string, telephone: string, message: string): Promise<unknown> {
    return await this.sender.execute(messageType, telephone, message);
  }

  public async newAttendiment(clientTelephone: string): Promise<boolean> {
    try {
      await this.send(
        ESenderType.TEXT,
        clientTelephone,
        LanguageManagerSingleton.translate('attendiment:ATTENDIMENT_MESSAGE_WAIT_FOR_CONSULTANT')
      );
      await this.send(
        ESenderType.TEXT,
        clientTelephone,
        LanguageManagerSingleton.translate('attendiment:ATTENDIMENT_MESSAGE_TO_ACCELERATE_ATTENDANCE')
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  public async sendFormattedMessageToConsultant(
    { name: nameClient, nameSave: nameSaveClient }: Client,
    messageContent: string,
    consultantTelephone: string
  ): Promise<unknown> {
    const dateCurrent = new Date();
    return await this.send(
      ESenderType.TEXT,
      consultantTelephone,
      LanguageManagerSingleton.translate('attendiment:ATTENDIMENT_MESSAGE_WITH_INFO_CLIENT', {
        nameSaveClient,
        nameClient,
        dateCurrent,
        messageContent,
      })
    );
  }

  public async sendFormattedMessageToClient(
    clientTelephone: string,
    consultantName: string,
    messageContent: string
  ): Promise<unknown> {
    return await this.send(
      ESenderType.TEXT,
      clientTelephone,
      LanguageManagerSingleton.translate('attendiment:ATTENDIMENT_MESSAGE_WITH_NAME_CONSULTANT_AND_CONTENT', {
        consultantName,
        messageContent,
      })
    );
  }

  public async sendFormattedMessageToConsultantForNewClient(telephone: string, clientName: string): Promise<unknown> {
    const messageNewClientToConsultant = LanguageManagerSingleton.translate(
      'attendiment:ATTENDIMENT_NEW_CLIENT_FOR_CONSULTANT',
      {
        clientName,
      }
    );
    return await this.send(ESenderType.TEXT, telephone, messageNewClientToConsultant);
  }
}
