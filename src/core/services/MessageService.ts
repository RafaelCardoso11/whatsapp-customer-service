import { Sender } from '../../infra/Whatsapp/Sender'
import { extractTelephoneForIdTelephone } from '../../helpers/extractTelephoneForIdTelephone'

import { ConsultantRepository } from '../../infra/repositories/Consultant'
import { telephoneToIdTelephone } from '../../helpers/telephoneToIdTelephone'
import { Consultant } from '../entities/Consultant'
import { logger } from '../../infra/logger/logger'
import { IWhatsappSender } from '../../adapters/interfaces/whatsappSender'
import { IMessage } from '../entities/Message'
import { Client } from '../entities/Client'

export class MessageService {
  private sender: Sender

  constructor(private readonly client: IWhatsappSender) {
    this.sender = new Sender(client)
  }
  async startSupport(idClient: string) {
    await this.client.sendText(
      idClient,
      `Olá, tudo bem? 😊\n` + `Em breve você será atendido por um de nossos consultores.`
    )

    await this.client.sendText(
      idClient,
      `Para agilizar o nosso atendimento informe o seu nome e dúvida/pedido que já retornaremos.`
    )

    return true
  }

  sendMessageToClient(idClient: string, message: IMessage): void {
    const {
      sender: { pushname: nameWhatsappConsultant },
      content,
    } = message

    const formattedMessage = `*Consultor ${nameWhatsappConsultant}*\n${content}`

    this.sender.sendText(idClient, formattedMessage)
  }

  async sendMessageToConsultant(message: IMessage): Promise<void> {
    const {
      sender: { name: nameSaveClient, pushname: nameWhatsappClient, id: idClient },
    } = message

    const dateCurrent = new Date().toLocaleString('pt-BR')
    const numberClient = extractTelephoneForIdTelephone(idClient)

    const formattedMessage =
      `*Nome: ${nameSaveClient} / ${nameWhatsappClient}*\n` +
      `Data/Hora: ${dateCurrent}\n` +
      `Mensagem: ${message.content}`

    const clientCurrent = {
      _id: '',
      name: nameSaveClient,
      telephone: numberClient,
    }
    const consultant = await this.handleConsultantCurrent(clientCurrent)
    const idConsultant = telephoneToIdTelephone(consultant.telephone)
    this.sender.sendText(idConsultant, formattedMessage)
  }
  private async handleConsultantCurrent(clientCurrent: Client): Promise<Consultant> {
    const consultantRepository = new ConsultantRepository()
    const consultants = await consultantRepository.getAll()

    const consultantCurrent = consultants.find(
      (consultant) => consultant.clientCurrent?.telephone === clientCurrent.telephone
    )

    if (consultantCurrent) {
      return consultantCurrent
    }

    const newConsultant = await this.handleConsultantAvailable(consultants, clientCurrent)

    return newConsultant as Consultant
  }
  private async handleConsultantAvailable(
    consultants: Consultant[],
    clientCurrent: Client
  ): Promise<Consultant | string> {
    const consultantRepository = new ConsultantRepository()

    const consultantAvaliable = consultants.find((consultant) => consultant.clientCurrent?._id === '')

    if (consultantAvaliable) {
      const consultantWithClient = await consultantRepository.updateClientCurrent(
        consultantAvaliable._id,
        clientCurrent
      )
      if (consultantWithClient) {
        return consultantWithClient
      }
      logger.info('Não cadastrou o cliente')
    }
    logger.info('Nenhum consultor disponível')
    return 'Nenhum consultor disponível'
  }
}
