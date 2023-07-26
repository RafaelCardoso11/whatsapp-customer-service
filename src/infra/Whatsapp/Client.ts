import { EMessageType, IMessage } from '../../core/entities/Message'
import { logger } from '../logger/logger'
import { IWhatsappClient } from '../../adapters/interfaces/whatsappClient'
import { CommandsUseCase } from '../../core/usecases/Commands'

import { Client } from '../../core/entities/Client'

import { QueueAttendimentUseCase } from '../../core/usecases/QueueAttendiment'

import { ConsultantUseCase } from '../../core/usecases/Consultant'
import { SenderUseCase } from '../../core/usecases/Sender'

const CHAT_ID_STATUS = 'status@broadcast'
class WhatsappClient implements IWhatsappClient {
  private readonly client: IWhatsappClient
  private readonly commandsUseCase: CommandsUseCase
  private readonly consultantUseCase: ConsultantUseCase
  private readonly queueAttendimentUseCase: QueueAttendimentUseCase
  private readonly senderUseCase: SenderUseCase

  constructor(
    client: IWhatsappClient,
    queueAttendimentUseCase: QueueAttendimentUseCase,
    commandsUseCase: CommandsUseCase,
    consultantUseCase: ConsultantUseCase,
    senderUseCase: SenderUseCase
  ) {
    this.client = client
    this.commandsUseCase = commandsUseCase
    this.consultantUseCase = consultantUseCase
    this.queueAttendimentUseCase = queueAttendimentUseCase
    this.senderUseCase = senderUseCase
  }

  async initialize(): Promise<void> {
    try {
      await this.client.initialize(process.env.SERVER_SESSION_WS as string)
      await this.onMessage()
    } catch (error) {
      logger.error('Error during application bootstrap', error)
    }
  }
  async onMessage(): Promise<void> {
    await this.client.onMessage((message: IMessage) => {
      if (message.chatId != CHAT_ID_STATUS) {
        this.handleReceivedMessage(message)
      }
    })
  }

  private async handleReceivedMessage(message: IMessage) {
    const {
      sender: { telephone, name: nameSave, pushname: name },
    } = message

    const consultant = await this.consultantUseCase.CheckIsConsultantByTelephone(telephone)


    if (consultant) {
      logger.info('É um consultor')
      const initWithCommand = /^#\//
      const isCommand = initWithCommand.test(message.content)

      if (isCommand) {
        await this.commandsUseCase.executeCommand(consultant, message.content)
      }
    } else {
      logger.info('É um cliente')
      const consultorInAttendimentWithClient = await this.consultantUseCase.findByTelephoneClient(telephone)

      if (consultorInAttendimentWithClient) {
        logger.info('Cliente já em atendimento')
        const client: Client = {
          nameSave,
          name,
          telephone,
        }
        this.senderUseCase.sendFormattedMessageToConsultant(
          client,
          message.content,
          consultorInAttendimentWithClient.telephone
        )
      } else {
        await this.senderUseCase.newAttendiment(telephone)

        logger.info('Novo atendimento')
        const consultantAvaiable = await this.consultantUseCase.findConsultantAvailable()

        const clientCurrent: Client = {
          nameSave,
          name,
          telephone,
        }

        if (consultantAvaiable) {
          await this.consultantUseCase.updateConsultantAvailableWithNewClient(
            consultantAvaiable._id as string,
            clientCurrent
          )
          await this.senderUseCase.sendFormattedMessageToConsultantForNewClient(
            EMessageType.TEXT,
            consultantAvaiable.telephone
          )
          await this.senderUseCase.sendFormattedMessageToConsultant(
            clientCurrent,
            message.content,
            consultantAvaiable.telephone
          )
          logger.info('Cliente com um consultor')
        } else {
          await this.queueAttendimentUseCase.add(clientCurrent)
          logger.info('Fila de espera')
        }
      }
    }
  }
}
export default WhatsappClient
