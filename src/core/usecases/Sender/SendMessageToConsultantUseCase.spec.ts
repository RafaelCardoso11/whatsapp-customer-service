import { Client } from '../../entities/Client'


import { Consultant } from '../../entities/Consultant'

import { SenderUseCase } from '.'
import { formatterMessageToConsultant } from '../../../helpers/formatterMessageToConsultant'

import { WhatsappClientMemoryFactory } from '../../../infra/whatsapp/ClientMemoryFactory'

describe('SendMessageToConsultantUseCase', () => {
  let senderUseCase: SenderUseCase

  beforeEach(() => {
    const clientWhatsapp = WhatsappClientMemoryFactory.create()
    clientWhatsapp.initialize()

    senderUseCase = WhatsappClientMemoryFactory.senderUseCase
  })

  it('should send message text formatted to consultant with(name, nameSave, dateCurrent, content)', async () => {
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
