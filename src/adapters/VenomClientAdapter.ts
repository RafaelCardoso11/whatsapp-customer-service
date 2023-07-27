import { create, CreateOptions, Message, SendStickerResult, Whatsapp } from 'venom-bot';

import { IMessage } from '../core/entities/Message';

import { IWhatsappClient } from './interfaces/whatsappClient';
import { logger } from '../infra/logger/logger';

class VenomClientAdapter implements IWhatsappClient {
  private whatsappClient: Whatsapp;
  private readonly US = '@c.us';

  async initialize(session: string, ...rest: CreateOptions[]): Promise<void> {
    try {
      this.whatsappClient = await create({ session, ...rest });
    } catch (error) {
      logger.error(error);
    }
  }

  async onMessage(callback: (message: IMessage) => void): Promise<void> {
    await this.whatsappClient.onMessage((message: Message) => {
      const messageWithTelephone: any = {
        ...message,
        sender: {
          ...message.sender,
          telephone: this.idUsToTelephone(message.sender.id),
        },
      };
      callback(messageWithTelephone as IMessage);
    });
  }

  async sendText(to: string, content: string): Promise<object> {
    return await this.whatsappClient.sendText(this.telephoneToIdUS(to), content);
  }
  async sendImage(to: string, content: string): Promise<object> {
    return await this.whatsappClient.sendText(this.telephoneToIdUS(to), content);
  }
  async sendVoice(to: string, content: string): Promise<unknown> {
    return await this.whatsappClient.sendVoice(this.telephoneToIdUS(to), content);
  }
  async sendSticker(to: string, path: string): Promise<false | SendStickerResult> {
    return await this.whatsappClient.sendImageAsSticker(this.telephoneToIdUS(to), path);
  }
  async sendVideoAsGif(to: string, path: string, filename: string, caption: string): Promise<void> {
    return await this.whatsappClient.sendVideoAsGif(this.telephoneToIdUS(to), path, filename, caption);
  }
  async sendDocument(to: string, path: string, filename?: string, caption?: string): Promise<unknown> {
    return await this.whatsappClient.sendFile(this.telephoneToIdUS(to), path, filename, caption);
  }

  idUsToTelephone(idUS: string): string {
    const telephone = idUS.replace(this.US, '');
    return telephone;
  }
  telephoneToIdUS(telephone: string): string {
    const idUS = telephone.concat(this.US);
    return idUS;
  }
}

export default VenomClientAdapter;
