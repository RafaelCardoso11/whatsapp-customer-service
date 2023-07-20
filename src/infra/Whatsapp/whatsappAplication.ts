import { Message, MessageTypes } from '../../adapters/interfaces/Message'
import { ISender } from '../../adapters/interfaces/sender'
import { IWhatsappAplication } from '../../adapters/interfaces/whatsappAplication'
import { logger } from '../logger/logger'

class WhatsappAplication implements IWhatsappAplication, ISender {
  whatsappAplication: IWhatsappAplication

  constructor(whatsappAplication: IWhatsappAplication) {
    this.whatsappAplication = whatsappAplication
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
    await this.whatsappAplication.onMessage((message: Message) => {
      const { type, to, content } = message
      
      if (type.includes(MessageTypes.text)) {
        this.sendText(to, content)
      } else if (type.includes(MessageTypes.image)) {
        this.sendImage(to, content)
      } else if (type.includes(MessageTypes.song)) {
        this.sendVoice(to, content)
      } else if (type.includes(MessageTypes.sticker)) {
        this.sendSticker(to, content)
      }
    })
  }

  sendText(to: string, content: string): Promise<object> {
    throw new Error('Method not implemented.')
  }
  sendImage(to: string, content: string): Promise<object> {
    throw new Error('Method not implemented.')
  }
  sendVoice(to: string, content: string): Promise<unknown> {
    throw new Error('Method not implemented.')
  }
  sendSticker(to: string, path: string): Promise<false | object> {
    throw new Error('Method not implemented.')
  }
  sendVideoAsGif(to: string, path: string, filename: string, caption: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
  sendDocument(to: string, path: string): Promise<unknown> {
    throw new Error('Method not implemented.')
  }
}
export default WhatsappAplication
