import SenderMockAdapter from '../../adapters/SenderMockAdapter'
import constants from '../../constants'
import { Sender } from '../../infra/Whatsapp/Sender'
import { Client } from '../entities/Client'
import { Consultant } from '../entities/Consultant'
import { EMessageType } from '../entities/Message'
import { SendMessageToClient } from './SendMessageToClientUseCase'
import SenderClientMockAdapter from '../../adapters/SenderClientMockAdapter'

describe('SendMessageToClientUseCase', () => {
  it('should send message to client', async () => {
    const whatsappClient = new SenderClientMockAdapter()
    whatsappClient.initialize()

    const senderAdapter = new SenderMockAdapter(whatsappClient)
    console.log(senderAdapter, 'senderAdapter')
    const sender = new Sender(senderAdapter)

    const sendMessageToClient = new SendMessageToClient(sender)

    const client = new Client('1', 'Rafael', '9196320038')

    const message = 'Olá, tudo bem?'

    const sendTextSpy = jest.spyOn(sender, 'sendText')

    const messageSended = await sendMessageToClient.execute(EMessageType.TEXT, client, message)

    expect(sendTextSpy).toHaveBeenCalledWith(client.telephone, message)
  })
  it.skip('should send message formatted to client with name consultant', async () => {
    const whatsappClient = new SenderClientMockAdapter()
    const senderAdapter = new SenderMockAdapter(whatsappClient)
    const sender = new Sender(senderAdapter)

    const sendMessageToClient = new SendMessageToClient(sender)

    const client = new Client('1', 'Rafael', '9196320038')
    const consultant = new Consultant('1', 'Rebeca', '9196320037', client)

    const message = 'Olá, tudo bem?'

    const messageSended = await sendMessageToClient.messageFormattedWithNameConsultant(consultant, message)

    const messageWithNameClient = constants.sucess.MESSAGE_WITH_NAME_CONSULTANT_AND_CONTENT.replace(
      '{consultantName}',
      consultant.name
    ).replace('{messageContent}', message)

    expect(messageSended).toBe(messageWithNameClient)
  })
  it.skip('should send two messages to the client. One waiting for a consultant and outher asking for information to speed up customer service', async () => {
    const whatsappClient = new SenderClientMockAdapter()
    const senderAdapter = new SenderMockAdapter(whatsappClient)
    const sender = new Sender(senderAdapter)

    const sendMessageToClient = new SendMessageToClient(sender)

    const client = new Client('1', 'Rafael', '9196320038')
    const consultant = new Consultant('1', 'Rebeca', '9196320037', client)

    const message = 'Olá, tudo bem?'

    const messageSended = await sendMessageToClient.newAttendiment(consultant, message)

    expect(messageSended).toEqual([
      constants.sucess.MESSAGE_WAIT_FOR_CONSULTANT_1,
      constants.sucess.MESSAGE_WAIT_FOR_CONSULTANT_2,
    ])
  })
})
