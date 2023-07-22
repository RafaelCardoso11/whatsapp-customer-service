import { IMessage } from '../core/entities/Message'
import { IWhatsappClient } from './interfaces/whatsappClient'

class SenderClientMockAdapter implements IWhatsappClient {
  private whatsappClient: IWhatsappClient

  async initialize(): Promise<IWhatsappClient> {
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
      initialize: function (session: string): Promise<IWhatsappClient> {
        throw new Error('Function not implemented.')
      },
      onMessage: function (callback: (message: IMessage) => void): Promise<void> {
        throw new Error('Function not implemented.')
      },
    }

    return whatsappClient
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
}

export default SenderClientMockAdapter
