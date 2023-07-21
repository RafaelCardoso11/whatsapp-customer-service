import { Sender } from '../../infra/Whatsapp/Sender'
import constants from '../../constants/index'

export class SendMessageFormattedToClient {
  sender: Sender
  constructor(whatsappSender: Sender) {
    this.sender = whatsappSender
  }

  execute(idClient: string, consultantName: string, messageType: string, messageContent: string) {
    const { MESSAGE_WITH_NAME_CONSULTANT_AND_CONTENT } = constants.sucess

    const formattedMessage = MESSAGE_WITH_NAME_CONSULTANT_AND_CONTENT.replace(
      '{consultantName}',
      consultantName
    ).replace('{messageContent}', messageContent)

    this.sender.execute(messageType, idClient, formattedMessage)
  }
}
