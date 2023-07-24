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
import { Sender } from './Sender'
const CHAT_ID_STATUS = 'status@broadcast'
class WhatsappClient implements IWhatsappClient {
  private readonly client: IWhatsappClient
  private readonly commands: CommandsUseCase
  private readonly updateConsultantAvailableWithClient: UpdateConsultantAvailableWithClient
  private readonly sendMessageToConsultant: SendMessageToConsultant
  private readonly sendMessageToClient: SendMessageToClient
  private readonly findConsultantAvailable: FindConsultantAvailable

  constructor(client: IWhatsappClient) {
    this.client = client

    const sender = new Sender(client)
    this.commands = new CommandsUseCase(sender)
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
      this.handleReceivedMessage(message)
    })
  }

  private async handleReceivedMessage(message: IMessage) {
    const {
      sender: { telephone },
    } = message

    const consultant = await this.IsConsultant(telephone)

    if (consultant) {
      const initWithCommand = /^#\//
      const isCommand = initWithCommand.test(message.content)

      if (isCommand) {
        await this.commands.executeCommand(consultant, message.content)
      }
    }
  }

  private async IsConsultant(telephone: string): Promise<Consultant | null> {
    const consultantRepository = new ConsultantRepository()
    const consultant = await consultantRepository.getByTelephone(telephone)

    return consultant || null
  }

  async sendImage(to: string, content: string): Promise<object> {
    return await this.client.sendImage(to, content)
  }
  async sendVoice(to: string, content: string): Promise<unknown> {
    return await this.client.sendVoice(to, content)
  }
  async sendSticker(to: string, content: string): Promise<false | object> {
    return await this.client.sendSticker(to, content)
  }
  async sendVideoAsGif(to: string, content: string, filename: string, caption: string): Promise<void> {
    await this.client.sendVideoAsGif(to, content, filename, caption)
  }
  async sendDocument(to: string, content: string): Promise<unknown> {
    return await this.client.sendDocument(to, content)
  }
  async sendText(to: string, content: string): Promise<object> {
    return await this.client.sendText(to, content)
  }
}
export default WhatsappClient
