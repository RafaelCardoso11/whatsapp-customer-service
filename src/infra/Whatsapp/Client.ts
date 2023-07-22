import { IMessage } from '../../core/entities/Message'
import { logger } from '../logger/logger'
import { IWhatsappClient } from '../../adapters/interfaces/whatsappClient'
import { IWhatsappSender } from '../../adapters/interfaces/whatsappSender'

class WhatsappClient implements IWhatsappClient {
  constructor(private readonly whatsappClient: IWhatsappClient) {}

  async initialize(): Promise<IWhatsappSender> {
    try {
      this.onMessage()
      return await this.whatsappClient.initialize(process.env.SERVER_SESSION_WS as string)
    } catch (error) {
      logger.error('Error during application bootstrap', error)
      throw new Error(JSON.stringify(error))
    }
  }
  async onMessage(): Promise<void> {
    await this.whatsappClient.onMessage((message: IMessage) => {
      const { type, to, content } = message
    })
  }
}
export default WhatsappClient
