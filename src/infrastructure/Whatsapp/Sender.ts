import { Whatsapp } from "venom-bot";

export class Sender {
  constructor(private readonly client: Whatsapp) {}

  sendText(to: string, message: string): void {
    this.client.sendText(to, message);
  }
}
