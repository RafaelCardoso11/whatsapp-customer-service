import { ConsultantRepository } from '../../infra/repositories/Consultant'
import { Consultant } from '../entities/Consultant'

export default class CheckIsConsultant {
  constructor(private readonly consultantRepository: ConsultantRepository) {}

  execute(telephone: string): Promise<Consultant | null> {
    const consultant = this.consultantRepository.getByTelephone(telephone) || null
    return consultant
  }
}
