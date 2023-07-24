import constants from '../../constants'

import { Sender } from '../../infra/Whatsapp/Sender'
import { logger } from '../../infra/logger/logger'
import { ConsultantRepository } from '../../infra/repositories/Consultant'
import { Client } from '../entities/Client'
import { Consultant } from '../entities/Consultant'
import { EMessageType } from '../entities/Message'

export class FindConsultantAvailable {
  consultantRepository: ConsultantRepository
  sender: Sender
  constructor(consultantRepository: ConsultantRepository) {
    this.consultantRepository = consultantRepository
  }
  async execute() {
    const availableConsultant = await this.consultantRepository.findConsultantAvailable()

    if (!availableConsultant) {
      logger.error(constants.error.NO_AVAILABLE_CONSULTANT)
    }

    // const updatedConsultant = await this.updateConsultantWithClient(availableConsultant, clientCurrent)

    // if (updatedConsultant) {
    //   this.sendMessageToConsultantForNewClient(updatedConsultant.telephone, clientCurrent.name)
    // }
    return availableConsultant
  }
  private async updateConsultantWithClient(consultant: Consultant, clientCurrent: Client): Promise<Consultant | null> {
    try {
      const updatedConsultant = await this.consultantRepository.updateClientCurrent(consultant._id, clientCurrent)
      return updatedConsultant
    } catch (error) {
      logger.error(constants.error.FAIL_TO_UPDATE_CLIENT_FOR_CONSULTANT, error)
      return null
    }
  }

  private sendMessageToConsultantForNewClient(telephone: string, clientName: string) {
    const messageWithNameClient = constants.sucess.NEW_CLIENT_FOR_CONSULTANT.replace('{clientName}', clientName)
    this.sender.execute(EMessageType.TEXT, telephone, messageWithNameClient)
  }
}
