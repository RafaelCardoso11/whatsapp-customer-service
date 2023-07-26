import constants from '../../../constants'
import { Sender } from '../../../infra/whatsapp/Sender'
import { Client } from '../../entities/Client'
import { Consultant } from '../../entities/Consultant'

import SenderClientMockAdapter from '../../../adapters/SenderClientMockAdapter'
import WhatsappClient from '../../../infra/whatsapp/Client'
import { CommandsUseCase } from '../Commands'
import { ConsultantRepositoryMemory } from '../../../infra/repositories/ConsultantMemory'
import { QueueAttendimentRepository } from '../../../infra/repositories/QueueAttendiment'
import { ConsultantUseCase } from '../Consultant'
import { QueueAttendimentUseCase } from '../QueueAttendiment'
import { SenderUseCase } from '.'
import { formatterMessageToClient } from '../../../helpers/formatterMessageToClient'

describe('SendMessageToClientUseCase', () => {
  it('should send message text formatted to client with name consultant', async () => {
    const clientMockAdapter = new SenderClientMockAdapter()
    const sender = new Sender(clientMockAdapter)

    const consultantRepository = new ConsultantRepositoryMemory()
    const queueAttendimentRepository = new QueueAttendimentRepository()

    const queueAttendimentUseCase = new QueueAttendimentUseCase(queueAttendimentRepository)
    const commandsUseCase = new CommandsUseCase(sender)
    const consultantUseCase = new ConsultantUseCase(consultantRepository)
    const senderUseCase = new SenderUseCase(sender)

    const clientWhatsapp = new WhatsappClient(
      clientMockAdapter,
      queueAttendimentUseCase,
      commandsUseCase,
      consultantUseCase,
      senderUseCase
    )
    clientWhatsapp.initialize()

    const client: Client = {
      name: 'Rafael',
      telephone: '9196320038',
    }
    const consultant: Consultant = {
      name: 'Rebeca',
      telephone: '9196320038',
    }

    const message = 'Olá, tudo bem?'

    const messageToClient = await senderUseCase.sendFormattedMessageToClient(client.telephone, consultant.name, message)

    const messageWithNameClient = formatterMessageToClient(consultant.name, message)

    expect(messageToClient).toEqual({ to: client.telephone, content: messageWithNameClient })
  })
  it('should send two messages to the client. One waiting for a consultant and outher asking for information to speed up customer service', async () => {
    const clientMockAdapter = new SenderClientMockAdapter()
    const sender = new Sender(clientMockAdapter)

    const consultantRepository = new ConsultantRepositoryMemory()
    const queueAttendimentRepository = new QueueAttendimentRepository()

    const queueAttendimentUseCase = new QueueAttendimentUseCase(queueAttendimentRepository)
    const commandsUseCase = new CommandsUseCase(sender)
    const consultantUseCase = new ConsultantUseCase(consultantRepository)
    const senderUseCase = new SenderUseCase(sender)

    const clientWhatsapp = new WhatsappClient(
      clientMockAdapter,
      queueAttendimentUseCase,
      commandsUseCase,
      consultantUseCase,
      senderUseCase
    )
    clientWhatsapp.initialize()

    const senderSpy = jest.spyOn(sender, 'sendText')

    const client = new Client('1', 'Rafael', '9196320038')

    const sended = await senderUseCase.newAttendiment(client.telephone)

    const { MESSAGE_WAIT_FOR_CONSULTANT, MESSAGE_TO_ACCELERATE_ATTENDANCE } = constants.sucess_to_whatsapp

    expect(senderSpy).toBeCalledTimes(2)
    expect(senderSpy).toHaveBeenCalledWith(client.telephone, MESSAGE_WAIT_FOR_CONSULTANT)
    expect(senderSpy).toHaveBeenCalledWith(client.telephone, MESSAGE_TO_ACCELERATE_ATTENDANCE)
    expect(sended).toBeTruthy()
  })
})
