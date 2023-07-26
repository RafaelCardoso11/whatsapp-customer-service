import constants from '../../constants'
import { Sender } from '../../infra/Whatsapp/Sender'
import { Client } from '../entities/Client'
import { Consultant } from '../entities/Consultant'
import { EMessageType } from '../entities/Message'
import { SendMessageToClient } from './SendMessageToClientUseCase'
import SenderClientMockAdapter from '../../adapters/SenderClientMockAdapter'
import WhatsappClient from '../../infra/Whatsapp/Client'
import { CommandsUseCase } from './commands'
import { ConsultantRepositoryMemory } from '../../infra/repositories/ConsultantMemory'
import { QueueAttendimentRepository } from '../../infra/repositories/QueueAttendiment'

describe('SendMessageToClientUseCase', () => {
  it('should send message to client', async () => {
    const clientMockAdapter = new SenderClientMockAdapter()
    const sender = new Sender(clientMockAdapter)
    const commands = new CommandsUseCase(sender)
    const consultantRepository = new ConsultantRepositoryMemory()
    const queueAttendimentRepository = new QueueAttendimentRepository()
    const clientWhatsapp = new WhatsappClient(
      clientMockAdapter,
      sender,
      consultantRepository,
      queueAttendimentRepository,
      commands
    )

    clientWhatsapp.initialize()

    const sendMessageToClient = new SendMessageToClient(sender)
    const client = new Client('1', 'Rafael', '9196320038')

    const message = 'Olá, tudo bem?'

    const senderAdapterSpy = jest.spyOn(sender, 'sendText')
    const senderSpy = jest.spyOn(sender, 'sendText')

    const messageSended = await sendMessageToClient.execute(EMessageType.TEXT, client.telephone, message)

    expect(senderAdapterSpy).toHaveBeenCalledWith(client.telephone, message)
    expect(senderSpy).toHaveBeenCalledWith(client.telephone, message)

    expect(messageSended).toEqual({ to: client.telephone, content: message })
  })
  it('should send message text formatted to client with name consultant', async () => {
    const clientMockAdapter = new SenderClientMockAdapter()
    const sender = new Sender(clientMockAdapter)
    const commands = new CommandsUseCase(sender)
    const consultantRepository = new ConsultantRepositoryMemory()
    const queueAttendimentRepository = new QueueAttendimentRepository()
    const clientWhatsapp = new WhatsappClient(
      clientMockAdapter,
      sender,
      consultantRepository,
      queueAttendimentRepository,
      commands
    )

    clientWhatsapp.initialize()

    const sendMessageToClient = new SendMessageToClient(sender)

    const client = new Client('1', 'Rafael', '9196320038')
    const consultant = new Consultant('1', 'Rebeca', '9196320037', client)

    const message = 'Olá, tudo bem?'

    const messageToClient = await sendMessageToClient.messageFormattedWithNameConsultant(
      client.telephone,
      consultant.name,
      EMessageType.TEXT,
      message
    )

    const messageWithNameClient = constants.sucess.MESSAGE_WITH_NAME_CONSULTANT_AND_CONTENT.replace(
      '{consultantName}',
      consultant.name
    ).replace('{messageContent}', message)

    expect(messageToClient).toEqual({ to: client.telephone, content: messageWithNameClient })
  })
  it('should send two messages to the client. One waiting for a consultant and outher asking for information to speed up customer service', async () => {
    const clientMockAdapter = new SenderClientMockAdapter()
    const sender = new Sender(clientMockAdapter)
    const commands = new CommandsUseCase(sender)
    const consultantRepository = new ConsultantRepositoryMemory()
    const queueAttendimentRepository = new QueueAttendimentRepository()
    const clientWhatsapp = new WhatsappClient(
      clientMockAdapter,
      sender,
      consultantRepository,
      queueAttendimentRepository,
      commands
    )

    clientWhatsapp.initialize()

    const sendMessageToClient = new SendMessageToClient(sender)

    const senderSpy = jest.spyOn(sender, 'sendText')

    const client = new Client('1', 'Rafael', '9196320038')

    const sended = await sendMessageToClient.newAttendiment(client.telephone)

    const { MESSAGE_WAIT_FOR_CONSULTANT_1, MESSAGE_WAIT_FOR_CONSULTANT_2 } = constants.sucess

    expect(senderSpy).toBeCalledTimes(2)
    expect(senderSpy).toHaveBeenCalledWith(client.telephone, MESSAGE_WAIT_FOR_CONSULTANT_1)
    expect(senderSpy).toHaveBeenCalledWith(client.telephone, MESSAGE_WAIT_FOR_CONSULTANT_2)
    expect(sended).toBeTruthy()
  })
})
