import { Sender } from '../../infra/Whatsapp/Sender'
import { Client } from '../entities/Client'
import { EMessageType } from '../entities/Message'
import { SendMessageToConsultant } from './SendMessageToConsultantUseCase'
import SenderClientMockAdapter from '../../adapters/SenderClientMockAdapter'
import WhatsappClient from '../../infra/Whatsapp/Client'
import { formatterMessageClientWithInfoClient } from '../../helpers/formatterMessageClientWithInfosClient'

describe('SendMessageToConsultantUseCase', () => {
  it('should send message to Consultant', async () => {
    const clientMockAdapter = new SenderClientMockAdapter()
    const whatsappClient = new WhatsappClient(clientMockAdapter)

    whatsappClient.initialize()

    const sender = new Sender(whatsappClient)
    const sendMessageToConsultant = new SendMessageToConsultant(sender)

    const client = new Client('1', 'Rafael', '9196320038')

    const messageClient = 'Olá, boa tarde. Desejo comprar um produto.'

    const senderAdapterSpy = jest.spyOn(sender, 'sendText')
    const senderSpy = jest.spyOn(sender, 'sendText')

    const messageSended = await sendMessageToConsultant.execute(EMessageType.TEXT, client.telephone, messageClient)

    expect(senderAdapterSpy).toHaveBeenCalledWith(client.telephone, messageClient)
    expect(senderSpy).toHaveBeenCalledWith(client.telephone, messageClient)

    expect(messageSended).toEqual({ to: client.telephone, content: messageClient })
  })
  it('should send message text formatted to consultant with infos (name, nameSave, dateCurrent, content) consultant', async () => {
    const clientMockAdapter = new SenderClientMockAdapter()
    const whatsappClient = new WhatsappClient(clientMockAdapter)

    whatsappClient.initialize()

    const sender = new Sender(whatsappClient)

    const sendMessageToConsultant = new SendMessageToConsultant(sender)

    const client = new Client('1', 'Rafael', '9196320038')
    client.nameSave = 'Rafael Cliente'

    const messageClient = 'Olá, tudo bem?'

    const messageFormatted = await sendMessageToConsultant.messageFormattedWithInfosClient(client, messageClient)

    const messageClientFormatted = formatterMessageClientWithInfoClient(client, messageClient)

    expect(messageFormatted).toEqual({
      to: client.telephone,
      content: messageClientFormatted,
    })
  })
})
