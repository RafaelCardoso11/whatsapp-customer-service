import { Sender } from '../../../infra/whatsapp/Sender';
import { Consultant } from '../../entities/Consultant';
import { ICommand } from './interfaces/command';

export class GenerateWhatsappLinkCommandCommand implements ICommand {
  constructor(private readonly sender: Sender) {}
  async execute(consultant: Consultant): Promise<boolean> {
    if (consultant.clientCurrent?._id) {
      const telephoneClient = consultant.clientCurrent.telephone;

      if (telephoneClient) {
        const UrlWhatsappWithPhoneCliente = 'https://api.whatsapp.com/send?phone=' + telephoneClient;

        await this.sender.sendText(consultant.telephone, `*APENAS POR NECESSIDADE* : ${UrlWhatsappWithPhoneCliente}`);
        return true;
      }
    }
    await this.sender.sendText(consultant.telephone, 'Nenhum cliente em seu CHAT');
    return false;
  }
}
