import { IMessage } from '../../core/entities/Message'
import { IWhatsappSender } from './whatsappSender'

export interface IWhatsappClient extends Partial<IWhatsappSender> {
  initialize(session: string): Promise<unknown>
  onMessage(callback: (message: IMessage) => void): Promise<void>
}
