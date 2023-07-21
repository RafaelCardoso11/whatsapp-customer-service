import constants from '../../constants';
import { extractTelephoneForIdTelephone } from '../../helpers/extractTelephoneForIdTelephone';
import { telephoneToIdTelephone } from '../../helpers/telephoneToIdTelephone';
import { Sender } from '../../infra/Whatsapp/Sender';
import { logger } from '../../infra/logger/logger';
import { ConsultantRepository } from '../../infra/repositories/Consultant';
import { EMessageType } from '../entities/Message';

export class SendMessageFormattedToConsultant {
  consultantRepository: ConsultantRepository;
  sender: Sender;
  constructor(consultantRepository: ConsultantRepository, sender: Sender) {
    this.consultantRepository = consultantRepository;
    this.sender = sender;
  }
  async execute(idClient: string, nameSaveClient: string, nameClient: string, messageContent: string): Promise<void> {
    const dateCurrent = new Date().toLocaleString('pt-BR');

    const numberClient = extractTelephoneForIdTelephone(idClient);

    const { MESSAGE_WITH_INFO_CLIENT } = constants.sucess;

    const formattedMessage = MESSAGE_WITH_INFO_CLIENT
      .replace('{nameSaveClient}', nameSaveClient)
      .replace('{nameClient}', nameClient)
      .replace('{dateCurrent}', dateCurrent)
      .replace('{messageContent}', messageContent);

    const consultant = await this.consultantCurrentAttendiment(idClient);

    if (consultant) {
      this.sendMessageWithIdTelephone(numberClient, formattedMessage);
    }
  }
  private consultantCurrentAttendiment(idClient: string) {
    try {
      const consultant = this.consultantRepository.findConsultantByIdClient(idClient);
      return consultant;
    } catch (error) {
      logger.error(error);
      return null;
    }
  }
  private sendMessageWithIdTelephone(telephone: string, message: string) {
    const idTelephone = telephoneToIdTelephone(telephone);

    this.sender.execute(EMessageType.text, idTelephone, message);
  }
}
