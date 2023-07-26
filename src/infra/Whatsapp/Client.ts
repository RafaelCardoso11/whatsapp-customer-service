import { EMessageType, IMessage } from '../../core/entities/Message'
import { logger } from '../logger/logger'
import { IWhatsappClient } from '../../adapters/interfaces/whatsappClient'

import { ConsultantRepository } from '../repositories/Consultant'
import { Consultant } from '../../core/entities/Consultant'
import { CommandsUseCase } from '../../core/usecases/commands'

import { Client } from '../../core/entities/Client'

import { QueueAttendimentUseCase } from '../../core/usecases/QueueAttendiment'
import { Sender } from './Sender'
import { SendMessageToConsultant } from '../../core/usecases/Sender/SendMessageToConsultantUseCase'
import { SendMessageToClient } from '../../core/usecases/Sender/SendMessageToClientUseCase'
import { ConsultantUseCase } from '../../core/usecases/Consultant'

const CHAT_ID_STATUS = 'status@broadcast'
class WhatsappClient implements IWhatsappClient {
  private readonly client: IWhatsappClient
  private readonly commandsUseCase: CommandsUseCase
  private readonly sendMessageToConsultant: SendMessageToConsultant
  private readonly sendMessageToClient: SendMessageToClient
  private readonly consultantUseCase: ConsultantUseCase
  private readonly queueAttendimentUseCase: QueueAttendimentUseCase

  constructor(
    client: IWhatsappClient,
    sender: Sender,
    queueAttendimentUseCase: QueueAttendimentUseCase,
    commandsUseCase: CommandsUseCase,
    consultantUseCase: ConsultantUseCase
  ) {
    this.client = client
    this.commandsUseCase = commandsUseCase
    this.consultantUseCase = consultantUseCase
    this.queueAttendimentUseCase = queueAttendimentUseCase

    this.sendMessageToClient = new SendMessageToClient(sender)
    this.sendMessageToConsultant = new SendMessageToConsultant(sender)
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

    console.log('Uai')
    if (consultant) {
      logger.info('É um consultor')
      const initWithCommand = /^#\//
      const isCommand = initWithCommand.test(message.content)

      if (isCommand) {
        await this.commandsUseCase.executeCommand(consultant, message.content)
      }
    } else {
      logger.info('É um cliente')
      const consultorInAttendimentWithClient = await this.findConsultantByIdClient(telephone)

      if (consultorInAttendimentWithClient) {
        logger.info('Cliente já em atendimento')
        const client: Client = {
          nameSave,
          name,
          telephone,
        }
        this.sendMessageToConsultant.messageFormattedWithInfosClient(
          client,
          message.content,
          consultorInAttendimentWithClient.telephone
        )
      } else {
        if (await this.sendMessageToClient.newAttendiment(telephone)) {
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
            await this.sendMessageToConsultant.execute(
              EMessageType.TEXT,
              consultantAvaiable.telephone,
              `*ATENÇÃO:* _Novo atendimento_ \n Seja cordiál com 😊 ${clientCurrent.name}`
            )
            await this.sendMessageToConsultant.messageFormattedWithInfosClient(
              clientCurrent,
              message.content,
              consultantAvaiable.telephone
            )
            logger.info('Cliente com um consultor')
          } else {
            await this.queueAttendimentUseCase.add(clientCurrent)
            logger.info('Fila de espera')
          }
        } else {
          logger.info('Continuando atendimento')
        }
      }
    }
  }

  private async findConsultantByIdClient(idClient: string): Promise<Consultant | null> {
    const consultantRepository = new ConsultantRepository()
    const consultant = await consultantRepository.findConsultantByIdClient(idClient)

    return consultant || null
  }
}
export default WhatsappClient
