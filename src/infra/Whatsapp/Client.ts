import { EMessageType, IMessage } from '../../core/entities/Message'
import { logger } from '../logger/logger'
import { IWhatsappClient } from '../../adapters/interfaces/whatsappClient'

import { ConsultantRepository } from '../repositories/Consultant'
import { Consultant } from '../../core/entities/Consultant'
import { CommandsUseCase } from '../../core/usecases/commands'
import UpdateConsultantAvailableWithClient from '../../core/usecases/UpdateConsultantAvailableWithClientUseCase'
import { SendMessageToClient } from '../../core/usecases/SendMessageToClientUseCase'
import { SendMessageToConsultant } from '../../core/usecases/SendMessageToConsultantUseCase'
import { FindConsultantAvailable } from '../../core/usecases/FindConsultantAvailableUseCase'
import { Client } from '../../core/entities/Client'

import CheckIsConsultant from '../../core/usecases/CheckIsConsultantUseCase'
import { QueueAttendimentUseCase } from '../../core/usecases/QueueAttendiment'
import { Sender } from './Sender'
import { QueueAttendimentRepository } from '../repositories/QueueAttendiment'

const CHAT_ID_STATUS = 'status@broadcast'
class WhatsappClient implements IWhatsappClient {
  private readonly client: IWhatsappClient
  private readonly commands: CommandsUseCase
  private readonly updateConsultantAvailableWithClient: UpdateConsultantAvailableWithClient
  private readonly sendMessageToConsultant: SendMessageToConsultant
  private readonly sendMessageToClient: SendMessageToClient
  private readonly findConsultantAvailable: FindConsultantAvailable
  private readonly checkIsConsultant: CheckIsConsultant
  private readonly queueAttendimentRepository: QueueAttendimentUseCase

  constructor(
    client: IWhatsappClient,
    sender: Sender,
    consultantRepository: ConsultantRepository,
    queueAttendimentRepository: QueueAttendimentRepository,
    commands: CommandsUseCase
  ) {
    this.client = client
    this.commands = commands

    this.sendMessageToClient = new SendMessageToClient(sender)
    this.sendMessageToConsultant = new SendMessageToConsultant(sender)
    this.findConsultantAvailable = new FindConsultantAvailable(consultantRepository)
    this.checkIsConsultant = new CheckIsConsultant(consultantRepository)
    this.queueAttendimentRepository = new QueueAttendimentUseCase(queueAttendimentRepository)
    this.updateConsultantAvailableWithClient = new UpdateConsultantAvailableWithClient(consultantRepository)
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

    const consultant = await this.checkIsConsultant.execute(telephone)

    console.log('Uai')
    if (consultant) {
      logger.info('É um consultor')
      const initWithCommand = /^#\//
      const isCommand = initWithCommand.test(message.content)

      if (isCommand) {
        await this.commands.executeCommand(consultant, message.content)
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
          const consultantAvaiable = await this.findConsultantAvailable.execute()

          const clientCurrent: Client = {
            nameSave,
            name,
            telephone,
          }

          if (consultantAvaiable) {
            await this.updateConsultantAvailableWithClient.execute(consultantAvaiable._id, clientCurrent)
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
            await this.queueAttendimentRepository.add(clientCurrent)
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
