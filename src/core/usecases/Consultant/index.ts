import { Client } from '../../entities/Client';

import { Consultant } from '../../entities/Consultant';
import { ConsultantRepository } from '../../../infra/repositories/Consultant';
export class ConsultantUseCase {
  constructor(private readonly consultantRepository: ConsultantRepository) {}

  public async CheckIsConsultantByTelephone(telephone: string): Promise<Consultant | null> {
    return await this.consultantRepository.getByTelephone(telephone);
  }

  public async findConsultantAvailable(): Promise<Consultant> {
    const availableConsultant = await this.consultantRepository.findConsultantAvailable();

    return availableConsultant;
  }
  public async findByTelephoneClient(telephone: string): Promise<Consultant | null> {
    const consultant = await this.consultantRepository.findByTelephoneClient(telephone);

    return consultant;
  }
  public async updateConsultantAvailableWithNewClient(idConsultant: string, newClient: Client): Promise<Consultant> {
    const consultantAvaiableUpdated = await this.consultantRepository.updateClientCurrent(idConsultant, newClient);

    return consultantAvaiableUpdated;
  }
}
