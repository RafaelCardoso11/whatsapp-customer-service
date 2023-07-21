import VenomAdapter from '../../adapters/VenomAdapter'
import { Sender } from '../../infra/Whatsapp/Sender'
import { ConsultantRepositoryMemory } from '../../infra/repositories/ConsultantMemory'
import { FindConsultantAvailable } from './FindConsultantAvailableUseCase'

describe('FindConsultantAvailableUseCase', () => {
  it('should find available Consultant', async () => {
    const consultantRepository = new ConsultantRepositoryMemory()
    const findConsultantAvailable = new FindConsultantAvailable(consultantRepository)

    const consultantAvailable = await findConsultantAvailable.execute()

    expect(consultantAvailable).toBeInstanceOf(Object)
    expect(consultantAvailable).not.toHaveProperty('clientCurrent')
  })
  it('should return error if no consultant is available', async () => {
    const consultantRepository = new ConsultantRepositoryMemory()

    const notAvailableConsultants = consultantRepository.consultants.filter((consultant) => consultant.clientCurrent)

    consultantRepository.consultants = notAvailableConsultants

    const findConsultantAvailable = new FindConsultantAvailable(consultantRepository)

    expect(findConsultantAvailable.execute()).rejects.toThrow()
  })
})
