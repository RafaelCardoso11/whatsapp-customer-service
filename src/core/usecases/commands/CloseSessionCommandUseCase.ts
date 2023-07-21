import { AttendimentRepository } from '../../../infra/repositories/Attendiment'
import { ConsultantRepository } from '../../../infra/repositories/Consultant'
import { Consultant } from '../../entities/Consultant'
import { ICommand } from './interfaces/command'

export class CloseSessionCommand implements ICommand {
  async execute(consultant: Consultant): Promise<string> {
    const { _id, clientCurrent } = consultant
    const consultantRepository = new ConsultantRepository()
    const attendimentRepository = new AttendimentRepository()

    const clientCurrentEmpty = {
      _id: '',
      name: '',
      telephone: '',
    }
    if (clientCurrent?._id) {
      await consultantRepository.updateClientCurrent(_id, clientCurrentEmpty)

      const attendimentCreated = await attendimentRepository.create({
        attendimentStars: 5,
        avaliation: [
          {
            content: 'OK',
          },
        ],
        consultant: consultant,
        date: new Date(),
        client: clientCurrent,
      })

      if (attendimentCreated?.number) {
        return `_Atendimento *#${attendimentCreated.number}* Encerrado com Sucesso_`
      }
      return 'Erro ao encerrar o Atendimento. Erro:' + JSON.stringify(attendimentCreated)
    }
    return 'Você não está em um atendimento!.'
  }
}
