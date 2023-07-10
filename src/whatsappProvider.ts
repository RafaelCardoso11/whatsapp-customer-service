import { Message, Whatsapp, create } from "venom-bot";
import { isEmpty, isEqual } from "lodash";
let idClient = "";

interface IConsultant {
  id: string;
  name: string;
  idClientCurrent: string;
}
const consultants: IConsultant[] = [
  {
    id: "559196320038@c.us",
    name: "Rafael Cardoso",
    idClientCurrent: idClient,
  },
];
export class WhatsappProvider {
  private client: Whatsapp;
  constructor() {
    this.onApplicationBootstrap();
  }

  async onApplicationBootstrap(): Promise<void> {
    try {
      const client = await create({
        session: "fones-belem",
      });
      this.start(client);
    } catch (error) {
      console.error("Error during application bootstrap", error);
    }
  }

  start(client: Whatsapp) {
    this.client = client;
    this.processClient(client);
  }
  processClient(client: Whatsapp) {
    client.onMessage((message: Message) => {
      this.support(message);
    });
  }
  support(message: Message) {
    const {
      sender: { id },
      content,
    } = message;

    const isConsultant = consultants.find(
      ({ id: idConsultant }) => id === idConsultant
    );
    const isClient = id === idClient && !isConsultant;

    const isNewSupport = isEmpty(idClient);

    const isToEndSupport = content.match(/Encerrar Atendimento/i);

    if (isNewSupport) {
      this.startSupport(id);
      this.sendMessageForConsultant(message);
    } else {
      if (isClient) {
        this.sendMessageForConsultant(message);
      }
      if (isConsultant) {
        if (isToEndSupport) {
          this.initEndSupport(message);
        } else {
          this.sendMessageForClient(message);
        }
      }
    }
  }
  sendMessageForClient(MESSAGE_CONSULTANT: Message) {
    const {
      sender: { pushname },
      content,
    } = MESSAGE_CONSULTANT;
    this.client.sendText(
      idClient,
      `
      *Consultor ${pushname}*
      ${content}
      `
    );
  }
  sendMessageForConsultant(MESSAGE_CLIENT: Message) {
    const {
      id,
      sender: { pushname, name },
      content,
    } = MESSAGE_CLIENT;

    const formattedDate = new Date().toLocaleString("pt-BR");
    this.client.sendText(
      consultants[0].id,
      `
          *Nome: ${name} / ${pushname} / ${id}*
          Data/Hora: ${formattedDate}
          Mensagem:  ${content}
          `
    );
    return;
  }
  startSupport(ID_CLIENT: string) {
    this.client.sendText(
      ID_CLIENT,
      `
      *Olá, tudo bem? ^-^*
      Agradecemos o seu Contato. Em breve você será atendido por um de nossos consultores.

      *Fones Belém*
      `
    );
    idClient = ID_CLIENT;
    return;
  }
  initEndSupport(MESSAGE_CLIENT: Message) {
    const clientCurrent = consultants.find(({ idClientCurrent }) =>
      isEqual(idClientCurrent, idClient)
    ) as IConsultant;


    if (MESSAGE_CLIENT.content.match(/sim/i)) {
      this.endSupport(clientCurrent);
    }
    
    this.client.sendText(
      idClient,
      `
      *Adoramos atende-lo (a)! <3*
      Podemos encerrar o seu atendimento? (SIM OU NÃO).
      Caso não responda nada será encerrado automáticamente em 5m <3

      *Fones Belém*
      `
    );
    
  }
  endSupport(consultant: IConsultant) {
    this.client.sendText(
      idClient,
      `
      *A Fones Belém Agradece o seu contato.*
      Caso precise estamos sempre disponíveis para você <3
      `
    );

    if (idClient) {
      this.client.sendText(
        consultant.id,
        `*Atendimento Encerrado. Aguarde por mais atendimentos.*`
      );
    } else {
      this.client.sendText(
        consultant.id,
        `Nenhum atendimento para ser encerrado.`
      );
    }
    idClient = "";
    return `Atendimento do Consultor ${consultant.name} encerrado.`;
  }
}
