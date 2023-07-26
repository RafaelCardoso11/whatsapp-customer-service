import constants from '../../../constants'
import { formatterMessageClientWithInfoClient } from '../../../helpers/formatterMessageClientWithInfosClient'
import { Sender } from '../../../infra/Whatsapp/Sender'
import { Client } from '../../entities/Client'
import { EMessageType } from '../../entities/Message'


export class SendMessageToConsultant {
  constructor(private readonly sender: Sender) {}

  execute(messageType: string, consultantTelephone: string, message: string): Promise<unknown> {
    return this.sender.execute(messageType, consultantTelephone, message)
  }
  messageFormattedWithInfosClient(
    client: Client,
    messageContent: string,
    consultantTelephone: string
  ): Promise<unknown> {
    const formattedMessage = formatterMessageClientWithInfoClient(client, messageContent)

    return this.sender.execute(EMessageType.TEXT, consultantTelephone, formattedMessage)
  }
  sendMessageToConsultantForNewClient(telephone: string, clientName: string) {
    const messageWithNameClient = constants.sucess_to_whatsapp.NEW_CLIENT_FOR_CONSULTANT.replace(
      '{clientName}',
      clientName
    )
    this.sender.execute(EMessageType.TEXT, telephone, messageWithNameClient)
  }
}
