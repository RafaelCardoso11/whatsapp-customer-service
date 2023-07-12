import { ICommand } from "./interfaces/command";

export class GenerateWhatsappLinkCommandCommand implements ICommand {
  execute(idClient: string): string {
    if (idClient) {
      const numberClient = this.getNumberClient(idClient);

      return `*APENAS POR NECESSIDADE* : https://api.whatsapp.com/send?phone=${numberClient}`;
    } else {
      return "Nenhum cliente em seu CHAT";
    }
  }
  getNumberClient(idClient: string): string {
    const numbersOnly = idClient.replace(/\D/g, "");
    return numbersOnly;
  }
}
