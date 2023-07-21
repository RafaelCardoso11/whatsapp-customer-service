import { IWhatsappSender } from '../../adapters/interfaces/whatsappSender'
import { EMessageType } from '../../core/entities/Message'

export class Sender implements IWhatsappSender {
  private sender: IWhatsappSender
  constructor(sender: IWhatsappSender) {
    this.sender = sender
  }

  async execute(type: string, to: string, content: string): Promise<unknown> {
    switch (type) {
      case EMessageType.text:
        return await this.sender.sendText(to, content)
      case EMessageType.image:
        return await this.sender.sendImage(to, content)
      case EMessageType.voice:
        return await this.sender.sendVoice(to, content)
      case EMessageType.sticker:
        return await this.sender.sendSticker(to, content)
      default:
        throw new Error('The message type is not supported')
    }
  }
  async sendImage(to: string, content: string): Promise<object> {
    return await this.sender.sendImage(to, content)
  }
  async sendVoice(to: string, content: string): Promise<unknown> {
    return await this.sender.sendImage(to, content)
  }
  async sendSticker(to: string, content: string): Promise<false | object> {
    return await this.sender.sendImage(to, content)
  }
  async sendVideoAsGif(to: string, content: string, filename: string, caption: string): Promise<void> {
    await this.sender.sendVideoAsGif(to, content, filename, caption)
  }
  async sendDocument(to: string, content: string): Promise<unknown> {
    return await this.sender.sendDocument(to, content)
  }
  async sendText(to: string, content: string): Promise<object> {
    return await this.sender.sendImage(to, content)
  }
}
