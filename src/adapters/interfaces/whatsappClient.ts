import { IMessage } from '../../core/entities/Message'
export interface IWhatsappClient {
  initialize(session: string): Promise<void>
  onMessage(callback: (message: IMessage) => void): Promise<void>
}
