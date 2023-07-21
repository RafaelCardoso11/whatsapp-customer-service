import { IMessage, EMessageType } from '../../core/entities/message'
import { IWhatsappSender } from '../../adapters/interfaces/whatsappSender'
import { IWhatsappAplication } from '../../adapters/interfaces/whatsappAplication'
import { logger } from '../logger/logger'

class WhatsappAplication implements IWhatsappAplication {
  whatsappAplication: IWhatsappAplication
  sender: IWhatsappSender

  constructor(whatsappAplication: IWhatsappAplication, sender: IWhatsappSender) {
    this.whatsappAplication = whatsappAplication
    this.sender = sender
  }

  async initialize(): Promise<void> {
    try {
      await this.whatsappAplication.initialize(process.env.SERVER_SESSION_WS as string)
      this.onMessage()
    } catch (error) {
      logger.error('Error during application bootstrap', error)
    }
  }
  async onMessage(): Promise<void> {
    await this.whatsappAplication.onMessage((message: IMessage) => {
      const { type, to, content } = message

     
    })
  }
}
export default WhatsappAplication
