import { Sender } from '../../../infra/whatsapp/Sender'
import { Client } from '../../entities/Client'

import SenderClientMockAdapter from '../../../adapters/SenderClientMockAdapter'
import WhatsappClient from '../../../infra/whatsapp/Client'

import { CommandsUseCase } from '../Commands'
import { Consultant } from '../../entities/Consultant'
import { ConsultantRepositoryMemory } from '../../../infra/repositories/ConsultantMemory'
import { QueueAttendimentRepository } from '../../../infra/repositories/QueueAttendiment'

import { QueueAttendimentUseCase } from '../QueueAttendiment'
import { ConsultantUseCase } from '../Consultant'
import { SenderUseCase } from '.'
import { formatterMessageToConsultant } from '../../../helpers/formatterMessageToConsultant'

describe('SendMessageToConsultantUseCase', () => {
  it('should send message text formatted to consultant with(name, nameSave, dateCurrent, content)', async () => {
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

    const client = new Client('1', 'Rafael', '9196320038')
    client.nameSave = 'Rafael Cliente'

    const consultant: Consultant = {
      name: 'Rafael Cardoso',
      telephone: '91996320038',
    }

    const messageClient = 'Olá, tudo bem?'

    const messageFormatted = await senderUseCase.sendFormattedMessageToConsultant(
      client,
      messageClient,
      consultant.telephone
    )

    const messageClientFormatted = formatterMessageToConsultant(client, messageClient)

    expect(messageFormatted).toEqual({
      to: consultant.telephone,
      content: messageClientFormatted,
    })
  })
})
