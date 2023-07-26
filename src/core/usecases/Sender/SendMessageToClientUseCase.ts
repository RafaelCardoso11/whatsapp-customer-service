import constants from '../../../constants'
import { Sender } from '../../../infra/Whatsapp/Sender'
import { EMessageType } from '../../entities/Message'

export class SendMessageToClient {
  constructor(private readonly sender: Sender) {}

  execute(messageType: string, clientTelephone: string, message: string): Promise<unknown> {
    return this.sender.execute(messageType, clientTelephone, message)
  }
  async newAttendiment(clientTelephone: string): Promise<boolean> {
    const { MESSAGE_WAIT_FOR_CONSULTANT_1, MESSAGE_WAIT_FOR_CONSULTANT_2 } = constants.sucess_to_whatsapp

    await this.sender.execute(EMessageType.TEXT, clientTelephone, MESSAGE_WAIT_FOR_CONSULTANT_1)
    await this.sender.execute(EMessageType.TEXT, clientTelephone, MESSAGE_WAIT_FOR_CONSULTANT_2)

    return true
  }
  messageFormattedWithNameConsultant(
    clientTelephone: string,
    consultantName: string,
    messageType: string,
    messageContent: string
  ): Promise<unknown> {
    const { MESSAGE_WITH_NAME_CONSULTANT_AND_CONTENT } = constants.sucess_to_whatsapp

    const formattedMessage = MESSAGE_WITH_NAME_CONSULTANT_AND_CONTENT.replace(
      '{consultantName}',
      consultantName
    ).replace('{messageContent}', messageContent)

    return this.sender.execute(messageType, clientTelephone, formattedMessage)
  }
}
