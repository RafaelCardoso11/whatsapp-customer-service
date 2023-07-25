import { Sender } from '../../infra/Whatsapp/Sender'
import { Client } from '../entities/Client'
import { EMessageType } from '../entities/Message'
import { SendMessageToConsultant } from './SendMessageToConsultantUseCase'
import SenderClientMockAdapter from '../../adapters/SenderClientMockAdapter'
import WhatsappClient from '../../infra/Whatsapp/Client'
import { formatterMessageClientWithInfoClient } from '../../helpers/formatterMessageClientWithInfosClient'
import { CommandsUseCase } from './commands'
import { Consultant } from '../entities/Consultant'

describe('SendMessageToConsultantUseCase', () => {
  it('should send message to Consultant', async () => {
    const clientMockAdapter = new SenderClientMockAdapter()
    const sender = new Sender(clientMockAdapter)
    const commands = new CommandsUseCase(sender)
    const clientWhatsapp = new WhatsappClient(clientMockAdapter, commands)

    clientWhatsapp.initialize()

    const sendMessageToConsultant = new SendMessageToConsultant(sender)

    const consultant: Consultant = {
      _id: '1',
      name: 'Rafael Cardoso',
      telephone: '91996320038',
    }

    const messageClient = 'Olá, boa tarde. Desejo comprar um produto.'

    const senderAdapterSpy = jest.spyOn(sender, 'sendText')
    const senderSpy = jest.spyOn(sender, 'sendText')

    const messageSended = await sendMessageToConsultant.execute(EMessageType.TEXT, consultant.telephone, messageClient)

    expect(senderAdapterSpy).toHaveBeenCalledWith(consultant.telephone, messageClient)
    expect(senderSpy).toHaveBeenCalledWith(consultant.telephone, messageClient)

    expect(messageSended).toEqual({ to: consultant.telephone, content: messageClient })
  })
  it('should send message text formatted to consultant with infos (name, nameSave, dateCurrent, content) consultant', async () => {
    const clientMockAdapter = new SenderClientMockAdapter()
    const sender = new Sender(clientMockAdapter)
    const commands = new CommandsUseCase(sender)
    const clientWhatsapp = new WhatsappClient(clientMockAdapter, commands)

    clientWhatsapp.initialize()

    const sendMessageToConsultant = new SendMessageToConsultant(sender)

    const client = new Client('1', 'Rafael', '9196320038')
    client.nameSave = 'Rafael Cliente'

    const consultant: Consultant = {
      _id: '1',
      name: 'Rafael Cardoso',
      telephone: '91996320038',
    }

    const messageClient = 'Olá, tudo bem?'

    const messageFormatted = await sendMessageToConsultant.messageFormattedWithInfosClient(
      client,
      messageClient,
      consultant.telephone
    )

    const messageClientFormatted = formatterMessageClientWithInfoClient(client, messageClient)

    expect(messageFormatted).toEqual({
      to: consultant.telephone,
      content: messageClientFormatted,
    })
  })
})
