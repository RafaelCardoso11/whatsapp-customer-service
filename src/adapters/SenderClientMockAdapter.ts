import { IMessage } from '../core/entities/Message';
import { IWhatsappClient } from './interfaces/whatsappClient';
import { IWhatsappSender } from './interfaces/whatsappSender';

class SenderClientMockAdapter implements IWhatsappClient {
  private whatsappSender: IWhatsappSender;

  async initialize(): Promise<void> {
    const whatsappSender: IWhatsappSender = {
      sendText: function (to: string, content: string): Promise<object> {
        return Promise.resolve({ to, content });
      },
      sendImage: function (to: string, content: string): Promise<object> {
        return Promise.resolve({ to, content });
      },
      sendVoice: function (to: string, content: string): Promise<unknown> {
        return Promise.resolve({ to, content });
      },
      sendSticker: function (to: string, path: string): Promise<false | object> {
        return Promise.resolve({ to, path });
      },
      sendVideoAsGif: async function (to: string, path: string, filename: string, caption: string): Promise<void> {
        await Promise.resolve({ to, path, filename, caption });
      },
      sendDocument: function (to: string, path: string, filename?: string, caption?: string) {
        return Promise.resolve({ to, path, filename, caption });
      },
    };

    this.whatsappSender = whatsappSender;
  }
  onMessage(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async sendText(to: string, content: string): Promise<object> {
    return await this.whatsappSender.sendText(to, content);
  }
  async sendImage(to: string, content: string): Promise<object> {
    return await this.whatsappSender.sendText(to, content);
  }
  async sendVoice(to: string, content: string): Promise<unknown> {
    return await this.whatsappSender.sendVoice(to, content);
  }
  async sendSticker(to: string, path: string): Promise<false | object> {
    return await this.whatsappSender.sendSticker(to, path);
  }
  async sendVideoAsGif(to: string, path: string, filename: string, caption: string): Promise<void> {
    return await this.whatsappSender.sendVideoAsGif(to, path, filename, caption);
  }
  async sendDocument(to: string, path: string, filename?: string, caption?: string): Promise<unknown> {
    return await this.whatsappSender.sendDocument(to, path, filename, caption);
  }
}

export default SenderClientMockAdapter;
