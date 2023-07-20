export interface IWhatsappSender {
  sendText(to: string, content: string): Promise<object>
  sendImage(to: string, content: string): Promise<object>
  sendVoice(to: string, content: string): Promise<unknown>
  sendSticker(to: string, path: string): Promise<false | object>
  sendVideoAsGif(to: string, path: string, filename: string, caption: string): Promise<void>
  sendDocument(to: string, path: string): Promise<unknown>
}
