import { IMessage } from '../core/entities/Message'
import { IWhatsappClient } from './interfaces/whatsappClient'

class SenderClientMockAdapter implements IWhatsappClient {
  private whatsappClient: IWhatsappClient

  async initialize(): Promise<void> {
    const whatsappClient: IWhatsappClient = {
      sendText: function (to: string, content: string): Promise<object> {
        return Promise.resolve({ to, content })
      },
      sendImage: function (to: string, content: string): Promise<object> {
        return Promise.resolve({ to, content })
      },
      sendVoice: function (to: string, content: string): Promise<unknown> {
        return Promise.resolve({ to, content })
      },
      sendSticker: function (to: string, path: string): Promise<false | object> {
        return Promise.resolve({ to, path })
      },
      sendVideoAsGif: async function (to: string, path: string, filename: string, caption: string): Promise<void> {
        await Promise.resolve({ to, path, filename, caption })
      },
      sendDocument: function (to: string, path: string, filename?: string, caption?: string) {
        return Promise.resolve({ to, path, filename, caption })
      },
      initialize: function (session: string): Promise<void> {
        throw new Error('Function not implemented.')
      },
      onMessage: function (callback: (message: IMessage) => void): Promise<void> {
        throw new Error('Function not implemented.')
      },
    }

    this.whatsappClient = whatsappClient
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

export default SenderClientMockAdapter
