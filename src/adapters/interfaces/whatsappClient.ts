import { IMessage } from '../../core/entities/Message'
import { IWhatsappSender } from './whatsappSender'

export interface IWhatsappClient extends IWhatsappSender {
  initialize(session: string): Promise<void>
  onMessage(callback: (message: IMessage) => void): Promise<void>
}
