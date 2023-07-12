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
  startSupport(idClient: string) {
    this.client.sendText(
      idClient,
      `Olá, tudo bem? 😊\n` +
        `Em breve você será atendido por um de nossos consultores.`
    );

    this.client.sendText(
      idClient,
      `Para agilizar o nosso atendimento informe o seu nome e dúvida/pedido que já retornaremos.`
    );
  }

  sendMessageToClient(idClient: string, message: Message): void {
    const {
      sender: { pushname: nameWhatsappConsultant },
      content,
    } = message;

    const formattedMessage = `*Consultor ${nameWhatsappConsultant}*\n${content}`;

    this.sender.sendText(idClient, formattedMessage);
  }

  sendMessageToConsultant(message: Message): void {
    const {
      sender: {
        name: nameSaveClient,
        pushname: nameWhatsappClient,
        id: idClient,
      },
    } = message;

    const dateCurrent = new Date().toLocaleString("pt-BR");

    const formattedMessage =
      `*Nome: ${nameSaveClient} / ${nameWhatsappClient} / ${idClient}*\n` +
      `Data/Hora: ${dateCurrent}\n` +
      `Mensagem: ${message.content}`;

    this.sender.sendText(consultants[0].id, formattedMessage);
  }
}
