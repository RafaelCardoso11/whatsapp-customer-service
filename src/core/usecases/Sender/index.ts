import constants from '../../../constants';
import { ESenderType } from '../../../enums/ESenderType';
import { formatterMessageToClient } from '../../../helpers/formatterMessageToClient';
import { formatterMessageToConsultant } from '../../../helpers/formatterMessageToConsultant';
import { formattedMessageNewClient } from '../../../helpers/formatterMessagemToConsultantForNewClient';
import { Sender } from '../../../infra/whatsapp/Sender';
import { Client } from '../../entities/Client';

export class SenderUseCase {
  constructor(private readonly sender: Sender) {}

  private async send(messageType: string, telephone: string, message: string): Promise<unknown> {
    return await this.sender.execute(messageType, telephone, message);
  }

  public async newAttendiment(clientTelephone: string): Promise<boolean> {
    const { MESSAGE_TO_ACCELERATE_ATTENDANCE, MESSAGE_WAIT_FOR_CONSULTANT } = constants.sucess_to_whatsapp;

    try {
      await this.send(ESenderType.TEXT, clientTelephone, MESSAGE_WAIT_FOR_CONSULTANT);
      await this.send(ESenderType.TEXT, clientTelephone, MESSAGE_TO_ACCELERATE_ATTENDANCE);
      return true;
    } catch (error) {
      return false;
    }
  }

  public async sendFormattedMessageToConsultant(
    client: Client,
    messageContent: string,
    consultantTelephone: string
  ): Promise<unknown> {
    const formattedMessage = formatterMessageToConsultant(client, messageContent);

    return await this.send(ESenderType.TEXT, consultantTelephone, formattedMessage);
  }

  public async sendFormattedMessageToClient(
    clientTelephone: string,
    consultantName: string,
    messageContent: string
  ): Promise<unknown> {
    const formattedMessage = formatterMessageToClient(consultantName, messageContent);

    return await this.send(ESenderType.TEXT, clientTelephone, formattedMessage);
  }

  public async sendFormattedMessageToConsultantForNewClient(telephone: string, clientName: string): Promise<unknown> {
    const messageNewClientToConsultant = formattedMessageNewClient(clientName);
    return await this.send(ESenderType.TEXT, telephone, messageNewClientToConsultant);
  }
}
