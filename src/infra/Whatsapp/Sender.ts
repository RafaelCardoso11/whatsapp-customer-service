import { IWhatsappSender } from '../../adapters/interfaces/whatsappSender';
import { ESenderType } from '../../enums/ESenderType';

export class Sender implements IWhatsappSender {
  constructor(private senderAdapter: IWhatsappSender) {}

  async execute(type: string, to: string, content: string): Promise<unknown> {
    switch (type) {
      case ESenderType.TEXT:
        return await this.sendText(to, content);
      case ESenderType.IMAGE:
        return await this.sendImage(to, content);
      case ESenderType.VOICE:
        return await this.sendVoice(to, content);
      case ESenderType.STICKER:
        return await this.sendSticker(to, content);
      default:
        throw new Error('The message type is not supported');
    }
  }
  async sendImage(to: string, content: string): Promise<object> {
    return await this.senderAdapter.sendImage(to, content);
  }
  async sendVoice(to: string, content: string): Promise<unknown> {
    return await this.senderAdapter.sendVoice(to, content);
  }
  async sendSticker(to: string, content: string): Promise<false | object> {
    return await this.senderAdapter.sendSticker(to, content);
  }
  async sendVideoAsGif(to: string, content: string, filename: string, caption: string): Promise<void> {
    await this.senderAdapter.sendVideoAsGif(to, content, filename, caption);
  }
  async sendDocument(to: string, content: string): Promise<unknown> {
    return await this.senderAdapter.sendDocument(to, content);
  }
  async sendText(to: string, content: string): Promise<object> {
    return await this.senderAdapter.sendText(to, content);
  }
}
