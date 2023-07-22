import { Sender } from '../../infra/Whatsapp/Sender'
import { Client } from '../entities/Client'
import { Consultant } from '../entities/Consultant'

export class SendMessageToClient {
  constructor(private readonly sender: Sender) {}

  execute(messageType: string, client: Client, message: string) {
    return this.sender.execute(messageType, client.telephone, message)
  }
  newAttendiment(consultant: Consultant, message: string) {}
  messageFormattedWithNameConsultant(consultant: Consultant, message: string) {}
}
