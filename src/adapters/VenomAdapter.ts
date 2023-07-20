import { create, CreateOptions, SendStickerResult, Whatsapp } from 'venom-bot'
import { IWhatsappAplication } from './interfaces/whatsappAplication'
import { IMessage } from '../core/entities/Message'
import { IWhatsappSender } from './interfaces/whatsappSender'

class VenomAdapter implements IWhatsappAplication, IWhatsappSender {
  private whatsappClient: Whatsapp

  async initialize(session: string, ...rest: CreateOptions[]): Promise<Whatsapp> {
    return (this.whatsappClient = await create({ session, ...rest }))
  }

  async onMessage(callback: (message: IMessage) => void): Promise<void> {
    await this.whatsappClient.onMessage((message) => {
      const messageConverted = this.convertMessageVenomToMessage(message)
      callback(messageConverted)
    })
  }

  private convertMessageVenomToMessage(messageVenom: any) {
    return messageVenom as IMessage
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

export default VenomAdapter
