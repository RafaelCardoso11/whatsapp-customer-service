import { Client } from '../../entities/Client'

import { logger } from '../../../infra/logger/logger'
import { Consultant } from '../../entities/Consultant'
import { ConsultantRepository } from '../../../infra/repositories/Consultant'
import constants from '../../../constants'

export class ConsultantUseCase {
  constructor(private readonly consultantRepository: ConsultantRepository) {}

  public async findAvaiable(): Promise<Consultant> {
    const availableConsultant = await this.consultantRepository.findConsultantAvailable()

    if (!availableConsultant) {
      logger.error(constants.error.NO_AVAILABLE_CONSULTANT)
    }

    return availableConsultant
  }

  public async updateClient(idConsultant: string, client: Client): Promise<Consultant | null> {
    const consultantUpdated = await this.consultantRepository.updateClientCurrent(idConsultant, client)

    if (!consultantUpdated) {
      logger.error(constants.error.NO_UPDATED_CLIENT)
    }

    return consultantUpdated || null
  }
}
