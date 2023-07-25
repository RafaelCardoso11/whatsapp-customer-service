import { IMessage } from '../../core/entities/Message'
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
const CHAT_ID_STATUS = 'status@broadcast'
class WhatsappClient implements IWhatsappClient {
  private readonly client: IWhatsappClient
  private readonly commands: CommandsUseCase
  private readonly updateConsultantAvailableWithClient: UpdateConsultantAvailableWithClient
  private readonly sendMessageToConsultant: SendMessageToConsultant
  private readonly sendMessageToClient: SendMessageToClient
  private readonly findConsultantAvailable: FindConsultantAvailable
  private readonly checkIsConsultant: CheckIsConsultant
  private readonly queueAttendiment: QueueAttendimentUseCase

  constructor(client: IWhatsappClient, commands: CommandsUseCase) {
    this.client = client
    this.commands = commands
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
      if (!CHAT_ID_STATUS) {
        this.handleReceivedMessage(message)
      }
    })
  }

  private async handleReceivedMessage(message: IMessage) {
    const {
      sender: { telephone, name, pushname },
    } = message

    const consultant = await this.checkIsConsultant.execute(telephone)

    if (consultant) {
      const initWithCommand = /^#\//
      const isCommand = initWithCommand.test(message.content)

      if (isCommand) {
        await this.commands.executeCommand(consultant, message.content)
      }
    } else {
      const consultorInAttendimentWithClient = await this.findConsultantByIdClient(telephone)

      if (consultorInAttendimentWithClient) {
        const client: Client = {
          nameSave: pushname,
          name,
          telephone,
        }
        this.sendMessageToConsultant.messageFormattedWithInfosClient(
          client,
          message.content,
          consultorInAttendimentWithClient.telephone
        )
      } else {
        this.sendMessageToClient.newAttendiment(telephone)
        const consultantAvaiable = await this.findConsultantAvailable.execute()

        const clientCurrent: Client = {
          nameSave: pushname,
          name,
          telephone,
        }

        if (consultantAvaiable) {
          await this.updateConsultantAvailableWithClient.execute(consultantAvaiable._id, clientCurrent)
        } else {
          await this.queueAttendiment.add(clientCurrent)
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
