import { Consultant } from '../../entities/Consultant';
import { ICommand } from './interfaces/command';

export class GenerateWhatsappLinkCommandCommand implements ICommand {
  execute(consultant: Consultant): string {
    if (consultant.clientCurrent?._id) {
      const numberClient = consultant.clientCurrent.telephone;

      return `*APENAS POR NECESSIDADE* : https://api.whatsapp.com/send?phone=${numberClient}`;
    } else {
      return 'Nenhum cliente em seu CHAT';
    }
  }
}
