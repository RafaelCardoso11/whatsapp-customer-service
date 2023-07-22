import { MessageService } from '../../core/services/MessageService'
import { CommandsUseCase } from '../../core/usecases/commands'
import { ConsultantRepository } from '../repositories/Consultant'

import { extractTelephoneForIdTelephone } from '../../helpers/extractTelephoneForIdTelephone'
import { Consultant } from '../../core/entities/Consultant'
import { logger } from '../logger/logger'
import { IWhatsappSender } from '../../adapters/interfaces/whatsappSender'
import { IMessage } from '../../core/entities/Message'

const CHAT_ID_STATUS = 'status@broadcast'
export class WhatsAppClient {
  private client: IWhatsappSender
  private commandsUseCase: CommandsUseCase

  constructor(private readonly commands: CommandsUseCase) {
    this.commandsUseCase = commands
  }

  private async handleReceivedMessage(message: IMessage) {
    const {
      sender: { id: idTelephone },
    } = message

    const sender = new MessageService(this.client)
    const consultants = await this.fetchConsultants()

    if (consultants) {
      const telephoneClient = extractTelephoneForIdTelephone(idTelephone)
      const isConsultant = this.isConsultant(telephoneClient, consultants)

      const consultantWithClientCurrent = consultants.find(
        ({ clientCurrent }) => clientCurrent?.telephone === telephoneClient
      )

      const isNewSupport = !consultantWithClientCurrent

      if (isConsultant) {
        const initWithCommand = /^#\//
        const isCommand = initWithCommand.test(message.content)

        if (isCommand) {
          const command = await this.commandsUseCase.executeCommand(isConsultant, message.content)
          this.client.sendText(idTelephone, command)
        } else {
          const consultantCurrent = consultants.find(({ telephone }) => telephone === telephoneClient)
          if (consultantCurrent && consultantCurrent.clientCurrent?._id) {
            sender.sendMessageToClient(consultantCurrent.clientCurrent._id, message)
          } else {
            this.client.sendText(idTelephone, '_Você não está em um atendimento!_')
          }
        }
      } else {
        if (isNewSupport) {
          if (await sender.startSupport(idTelephone)) {
            sender.sendMessageToConsultant(message)
          } else {
            logger.error('Support not initialized')
          }
        } else {
          sender.sendMessageToConsultant(message)
        }
      }
    } else {
      logger.info('Nenhum consultor cadastrado')
    }
  }

  private async fetchConsultants() {
    try {
      const consultantRepository = new ConsultantRepository()
      const consultants = await consultantRepository.getAll()
      return consultants
    } catch (error) {
      logger.error('Error updating consultants:', error)
    }
  }
  private isConsultant(telephoneClient: string, consultants: Consultant[]): Consultant | undefined {
    const consultant = consultants.find(({ telephone }) => telephone === telephoneClient)

    return consultant
  }
}
