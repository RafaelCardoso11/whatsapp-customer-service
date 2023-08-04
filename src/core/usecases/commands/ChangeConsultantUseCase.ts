import { LanguageManagerSingleton } from '../../../infra/language';
import { ConsultantRepository } from '../../../infra/repositories/Consultant';
import { Sender } from '../../../infra/whatsapp/Sender';
import { Consultant } from '../../entities/Consultant';
import { ICommand } from '../Commands/interfaces/command';

export class ChangeConsultantCommand implements ICommand {
  constructor(
    private readonly consultantRepository: ConsultantRepository,
    private readonly sender: Sender
  ) {}

  async execute(consultant: Consultant): Promise<boolean> {
    if (consultant.clientCurrent) {
      const consultantAvaiable = await this.consultantRepository.findConsultantAvailable();

      if (consultantAvaiable) {
        await this.consultantRepository.removeClientCurrentPropertyFromConsultant(consultant._id);
        await this.consultantRepository.updateClientCurrent(consultantAvaiable._id, consultant.clientCurrent);
        await this.sender.sendText(
          consultant.telephone,
          LanguageManagerSingleton.translate('attendiment:ATTENDIMENT_SEND_TO_OTHER_CONSULTANT')
        );

        await this.sender.sendText(
          consultant.clientCurrent.telephone,
          LanguageManagerSingleton.translate('attendiment:ATTENDIMENT_CHANGED', {
            consultantName: consultantAvaiable.name,
          })
        );

        await this.sender.sendText(
          consultantAvaiable.telephone,
          LanguageManagerSingleton.translate('attendiment:ATTENDIMENT_DO_YOU_RECEIVE_NEW_ATTENDIMENT')
        );

        return true;
      }
      await this.sender.sendText(
        consultant.telephone,
        LanguageManagerSingleton.translate('attendiment:ATTENDIMENT_NO_CONSULTANT_AVAILABLE_FOR_CHANGE')
      );
    } else {
      await this.sender.sendText(
        consultant.telephone,
        LanguageManagerSingleton.translate('attendiment:ATTENDIMENT_ARE_YOU_NOT_ATTENDIMENT_FOR_CHANGE')
      );
    }
    return false;
  }
}
