import { IWhatsappClient } from './interfaces/whatsappClient'
import { IWhatsappSender } from './interfaces/whatsappSender'

class SenderMockAdapter implements IWhatsappSender {
  whatsappClient: IWhatsappSender

  constructor(whatsappClient: IWhatsappClient) {
    this.whatsappClient = whatsappClient as IWhatsappSender
  }

  async sendText(to: string, content: string): Promise<object> {
    return await this.whatsappClient.sendText(to, content)
  }
  async sendImage(to: string, content: string): Promise<object> {
    return await this.whatsappClient.sendText(to, content)
  }
  async sendVoice(to: string, content: string): Promise<unknown> {
    return await this.whatsappClient.sendVoice(to, content)
  }
  async sendSticker(to: string, path: string): Promise<false | object> {
    return await this.whatsappClient.sendSticker(to, path)
  }
  async sendVideoAsGif(to: string, path: string, filename: string, caption: string): Promise<void> {
    return await this.whatsappClient.sendVideoAsGif(to, path, filename, caption)
  }
  async sendDocument(to: string, path: string, filename?: string, caption?: string): Promise<unknown> {
    return await this.whatsappClient.sendDocument(to, path, filename, caption)
  }
}

export default SenderMockAdapter
