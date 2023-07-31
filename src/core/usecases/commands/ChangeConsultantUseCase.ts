import constants from '../../../constants';
import { ConsultantRepository } from '../../../infra/repositories/Consultant';
import { Sender } from '../../../infra/whatsapp/Sender';
import { Consultant } from '../../entities/Consultant';
import { ICommand } from '../Commands/interfaces/command';

const {
  attendiment: {
    NO_CONSULTANT_AVAIABLE_FOR_CHANGE,
    ARE_YOU_NOT_ATTENDIMENTO_FOR_CHANGE,
    ATTENDIMENT_SEND_TO_OUTHER_CONSULTANT,
    DO_YOU_RECEPT_TO_NEW_ATTENDIMENT,
  },
} = constants;

const formatterConsultantSendToOutherConsultant = (consultantAvaiableName: string) =>
  ATTENDIMENT_SEND_TO_OUTHER_CONSULTANT.replace('{consultantAvaiableName}', consultantAvaiableName);
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
          formatterConsultantSendToOutherConsultant(consultantAvaiable.name)
        );

        await this.sender.sendText(
          consultant.clientCurrent.telephone,
          `*O seu atendimento foi alterado para o consultor ${consultantAvaiable.name}*`
        );

        await this.sender.sendText(consultantAvaiable.telephone, DO_YOU_RECEPT_TO_NEW_ATTENDIMENT);

        return true;
      }
      await this.sender.sendText(consultant.telephone, NO_CONSULTANT_AVAIABLE_FOR_CHANGE);
    } else {
      await this.sender.sendText(consultant.telephone, ARE_YOU_NOT_ATTENDIMENTO_FOR_CHANGE);
    }
    return false;
  }
}
