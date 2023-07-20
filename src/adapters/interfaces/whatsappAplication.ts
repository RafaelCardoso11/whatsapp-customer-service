import { Message } from "./Message";


export interface IWhatsappAplication {
  initialize(session: string): Promise<any>;
  onMessage(callback: (message: Message) => void): Promise<void>;
}
