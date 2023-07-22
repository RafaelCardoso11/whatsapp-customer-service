import { IMessage } from '../../core/entities/Message'
import { logger } from '../logger/logger'
import { IWhatsappClient } from '../../adapters/interfaces/whatsappClient'
import { CommandsUseCase } from '../../core/usecases/commands'

class WhatsappClient implements IWhatsappClient {
  constructor(private readonly whatsappClientAdapter: IWhatsappClient) {}

  async initialize(): Promise<IWhatsappClient> {
    try {
      return (await this.whatsappClientAdapter.initialize(process.env.SERVER_SESSION_WS as string)) as IWhatsappClient
    } catch (error) {
      logger.error('Error during application bootstrap', error)
      throw new Error(JSON.stringify(error))
    }
  }
  async onMessage(): Promise<void> {
    await this.whatsappClientAdapter.onMessage((message: IMessage) => {
      const { type, to, content } = message;
      console.log(message)
    })
  }
}
export default WhatsappClient
