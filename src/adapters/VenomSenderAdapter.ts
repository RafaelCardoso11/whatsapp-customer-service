import { SendStickerResult, Whatsapp } from 'venom-bot'

import { IWhatsappSender } from './interfaces/whatsappSender'

class VenomSenderAdapter implements IWhatsappSender {
  constructor(private readonly whatsappClient: Whatsapp) {}

  async sendText(to: string, content: string): Promise<object> {
    return await this.whatsappClient.sendText(to, content)
  }
  async sendImage(to: string, content: string): Promise<object> {
    return await this.whatsappClient.sendText(to, content)
  }
  async sendVoice(to: string, content: string): Promise<unknown> {
    return await this.whatsappClient.sendVoice(to, content)
  }
  async sendSticker(to: string, path: string): Promise<false | SendStickerResult> {
    return await this.whatsappClient.sendImageAsSticker(to, path)
  }
  async sendVideoAsGif(to: string, path: string, filename: string, caption: string): Promise<void> {
    return await this.whatsappClient.sendVideoAsGif(to, path, filename, caption)
  }
  async sendDocument(to: string, path: string, filename?: string, caption?: string): Promise<unknown> {
    return await this.whatsappClient.sendFile(to, path, filename, caption)
  }
}

export default VenomSenderAdapter
