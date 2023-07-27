import { ConsultantUseCase } from '.';
import { ConsultantRepositoryMemory } from '../../../infra/repositories/ConsultantMemory';

describe('FindConsultantAvailableUseCase', () => {
  it('should find available Consultant', async () => {
    const consultantRepository = new ConsultantRepositoryMemory();
    const consultantUseCase = new ConsultantUseCase(consultantRepository);
    const consultantAvailable = await consultantUseCase.findConsultantAvailable();

    expect(consultantAvailable).toBeInstanceOf(Object);
    expect(consultantAvailable).not.toHaveProperty('clientCurrent');
  });
  it('should return error if no consultant is available', async () => {
    const consultantRepository = new ConsultantRepositoryMemory();
    const consultantUseCase = new ConsultantUseCase(consultantRepository);

    const notAvailableConsultants = consultantRepository.consultants.filter((consultant) => consultant.clientCurrent);

    consultantRepository.consultants = notAvailableConsultants;

    expect(consultantUseCase.findConsultantAvailable()).rejects.toThrow();
  });
});
