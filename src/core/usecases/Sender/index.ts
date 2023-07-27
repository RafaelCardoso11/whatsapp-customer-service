import constants from '../../../constants';
import { formatterMessageToClient } from '../../../helpers/formatterMessageToClient';
import { formatterMessageToConsultant } from '../../../helpers/formatterMessageToConsultant';
import { formattedMessageNewClient } from '../../../helpers/formatterMessagemToConsultantForNewClient';
import { SendMessageError } from '../../../infra/errors/sender';
import { Sender } from '../../../infra/whatsapp/Sender';
import { Client } from '../../entities/Client';
import { EMessageType } from '../../entities/Message';

export class SenderUseCase {
  constructor(private readonly sender: Sender) {}

  private async send(messageType: string, telephone: string, message: string): Promise<unknown> {
    try {
      return await this.sender.execute(messageType, telephone, message);
    } catch (error) {
      throw new SendMessageError('Error sending message');
    }
  }

  public async newAttendiment(clientTelephone: string): Promise<boolean> {
    const { MESSAGE_TO_ACCELERATE_ATTENDANCE, MESSAGE_WAIT_FOR_CONSULTANT } = constants.sucess_to_whatsapp;

    try {
      await this.send(EMessageType.TEXT, clientTelephone, MESSAGE_WAIT_FOR_CONSULTANT);
      await this.send(EMessageType.TEXT, clientTelephone, MESSAGE_TO_ACCELERATE_ATTENDANCE);
    } catch (error) {
      throw new SendMessageError('Error during new attendance: ');
    }
    return true;
  }

  public async sendFormattedMessageToConsultant(
    client: Client,
    messageContent: string,
    consultantTelephone: string
  ): Promise<unknown> {
    const formattedMessage = formatterMessageToConsultant(client, messageContent);

    try {
      return await this.send(EMessageType.TEXT, consultantTelephone, formattedMessage);
    } catch (error) {
      throw new SendMessageError('Error sending formatted message to consultant: ');
    }
  }

  public async sendFormattedMessageToClient(
    clientTelephone: string,
    consultantName: string,
    messageContent: string
  ): Promise<unknown> {
    const formattedMessage = formatterMessageToClient(consultantName, messageContent);

    try {
      return await this.send(EMessageType.TEXT, clientTelephone, formattedMessage);
    } catch (error) {
      throw new SendMessageError('Error during new attendance: ');
    }
  }

  public async sendFormattedMessageToConsultantForNewClient(telephone: string, clientName: string): Promise<unknown> {
    const messageNewClientToConsultant = formattedMessageNewClient(clientName);
    try {
      return await this.send(EMessageType.TEXT, telephone, messageNewClientToConsultant);
    } catch (error) {
      throw new SendMessageError('Error during new attendance: ');
    }
  }
}
