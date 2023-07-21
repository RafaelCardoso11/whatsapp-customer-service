import constants from '../../constants'
import { telephoneToIdTelephone } from '../../helpers/telephoneToIdTelephone'
import { Sender } from '../../infra/Whatsapp/Sender'
import { logger } from '../../infra/logger/logger'
import { ConsultantRepository } from '../../infra/repositories/Consultant'
import { Client } from '../entities/Client'
import { Consultant } from '../entities/Consultant'
import { EMessageType } from '../entities/Message'

export class FindConsultantAvailable {
  consultantRepository: ConsultantRepository
  sender: Sender
  constructor(consultantRepository: ConsultantRepository, sender: Sender) {
    this.consultantRepository = consultantRepository
    this.sender = sender
  }
  async execute(clientCurrent: Client) {
    const availableConsultant = await this.consultantRepository.findConsultantWithoutClient()

    if (!availableConsultant) {
      logger.error(constants.error.NO_AVAILABLE_CONSULTANT)
      return availableConsultant
    }

    const updatedConsultant = await this.updateConsultantWithClient(availableConsultant, clientCurrent)

    if (updatedConsultant) {
      this.sendMessageToConsultantForNewClient(updatedConsultant.telephone, clientCurrent.name)
    }
    return updatedConsultant
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
    const idTelephone = telephoneToIdTelephone(telephone)

    const messageWithNameClient = constants.sucess.NEW_CLIENT_FOR_CONSULTANT.replace('{clientName}', clientName)
    this.sender.execute(EMessageType.text, idTelephone, messageWithNameClient)
  }
}
