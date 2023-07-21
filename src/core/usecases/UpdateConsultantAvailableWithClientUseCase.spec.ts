import { ConsultantRepositoryMemory } from '../../infra/repositories/ConsultantMemory'
import { Client } from '../entities/Client'
import { FindConsultantAvailable } from './FindConsultantAvailableUseCase'
import UpdateConsultantAvailableWithClient from './UpdateConsultantAvailableWithClientUseCase'

describe('UpdateConsultantAvailableWithClient', () => {
  it('should to updated available Consultant with new client (clientCurrent)', async () => {
    const consultantRepository = new ConsultantRepositoryMemory()
    const findConsultantAvailable = new FindConsultantAvailable(consultantRepository)

    const consultantAvailable = await findConsultantAvailable.execute()

    const updatedConsultantWithClient = new UpdateConsultantAvailableWithClient(consultantRepository)

    const newClient: Client = {
      name: 'Pedro',
      telephone: '9199522391932',
    }

    const consultantUpdated = await updatedConsultantWithClient.execute(consultantAvailable._id, newClient)

    expect(consultantUpdated).toHaveProperty('clientCurrent', newClient)
  })
})
