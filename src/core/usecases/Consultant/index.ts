import { Client } from '../../entities/Client';

import { Consultant } from '../../entities/Consultant';
import { ConsultantRepository } from '../../../infra/repositories/Consultant';
import { logger } from '../../../infra/logger/logger';
import constants from '../../../constants';

export class ConsultantUseCase {
  constructor(private readonly consultantRepository: ConsultantRepository) {}

  public async CheckIsConsultantByTelephone(telephone: string): Promise<Consultant> {
    const consultant = await this.consultantRepository.getByTelephone(telephone);

    if (!consultant) {
      logger.error(constants);
    }

    return consultant;
  }

  public async findConsultantAvailable(): Promise<Consultant> {
    const availableConsultant = await this.consultantRepository.findConsultantAvailable();

    if (!availableConsultant) {
      logger.error(availableConsultant);
    }

    return availableConsultant;
  }
  public async findByTelephoneClient(telephone: string): Promise<Consultant> {
    const consultant = await this.consultantRepository.findByTelephoneClient(telephone);

    if (!consultant) {
      logger.error(consultant);
    }

    return consultant;
  }
  public async updateConsultantAvailableWithNewClient(idConsultant: string, newClient: Client): Promise<Consultant> {
    const consultantAvaiableUpdated = await this.consultantRepository.updateClientCurrent(idConsultant, newClient);

    if (!consultantAvaiableUpdated) {
      logger.error(consultantAvaiableUpdated);
    }

    return consultantAvaiableUpdated;
  }
}
