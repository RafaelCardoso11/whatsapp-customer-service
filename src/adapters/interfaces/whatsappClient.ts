import { IMessage } from '../../core/entities/Message'
import { IWhatsappSender } from './whatsappSender'

export interface IWhatsappClient extends Partial<IWhatsappSender> {
  initialize(session: string): Promise<IWhatsappSender>
  onMessage(callback: (message: IMessage) => void): Promise<void>
}
