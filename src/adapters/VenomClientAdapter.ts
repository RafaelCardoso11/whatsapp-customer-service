import { create, CreateOptions, Whatsapp } from 'venom-bot'

import { IMessage } from '../core/entities/Message'
import VenomSenderAdapter from './VenomSenderAdapter'
import { IWhatsappSender } from './interfaces/whatsappSender'
import { IWhatsappClient } from './interfaces/whatsappClient'

class VenomClientAdapter implements IWhatsappClient {
  private whatsappClient: Whatsapp

  async initialize(session: string, ...rest: CreateOptions[]): Promise<IWhatsappSender> {
    const whatsappClient = await create({ session, ...rest })
    this.whatsappClient = whatsappClient
    return new VenomSenderAdapter(whatsappClient)
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

export default VenomClientAdapter
