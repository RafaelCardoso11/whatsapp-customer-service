import { Message, Whatsapp } from "venom-bot";
import { Sender } from "../../infrastructure/Whatsapp/Sender";

interface IConsultant {
  id: string;
  name: string;
  idClientCurrent: string;
}
const consultants: IConsultant[] = [
  {
    id: "559196320038@c.us",
    name: "Rafael Cardoso",
    idClientCurrent: "",
  },
];

export class MessageService {
  private sender: Sender;

  constructor(private readonly client: Whatsapp) {
    this.sender = new Sender(client);
  }
  startSupport(ID_CLIENT: string) {
    return this.client.sendText(
      ID_CLIENT,
      `
      *Olá, tudo bem? ^-^*
      Agradecemos o seu Contato. Em breve você será atendido por um de nossos consultores.

      *Fones Belém*
      `
    );
  }

  sendMessageToClient(idClient: string, message: Message): void {
    const formattedMessage = `*Consultor ${message.sender.pushname}*\n${message.content}`;
    this.sender.sendText(idClient, formattedMessage);
  }

  sendMessageToConsultant(message: Message): void {
    // Lógica para enviar mensagem ao consultor
    const formattedMessage =
      `*Nome: ${message.sender.name} / ${message.sender.pushname} / ${message.sender.id}*\n` +
      `Data/Hora: ${message.timestamp.toLocaleString("pt-BR")}\n` +
      `Mensagem: ${message.content}`;
    this.sender.sendText(consultants[0].id, formattedMessage);
  }
}
