import { ConsultantRepository } from '../../infra/repositories/Consultant'
import { Client } from '../entities/Client'
import { Consultant } from '../entities/Consultant'

export default class UpdateConsultantAvailableWithClient {
  constructor(private readonly consultantRepository: ConsultantRepository) {}

  execute(idConsultant: string, client: Client): Promise<Consultant | null> {
    return this.consultantRepository.updateClientCurrent(idConsultant, client)
  }
}
