import { ConsultantUseCase } from '.';
import { ConsultantRepositoryMemory } from '../../../infra/repositories/ConsultantMemory';
import { Client } from '../../entities/Client';

describe('UpdateConsultantAvailableWithClient', () => {
  it('should to updated available Consultant with new client (clientCurrent)', async () => {
    const consultantRepository = new ConsultantRepositoryMemory();
    const consultantUseCase = new ConsultantUseCase(consultantRepository);
    const consultantAvailable = await consultantUseCase.findConsultantAvailable();

    const newClient: Client = {
      _id: '1',
      name: 'Pedro',
      telephone: '9199522391932',
    };
    const consultantUpdated = await consultantUseCase.updateConsultantAvailableWithNewClient(
      consultantAvailable?._id as string,
      newClient
    );

    expect(consultantUpdated).toHaveProperty('clientCurrent', newClient);
  });
});
