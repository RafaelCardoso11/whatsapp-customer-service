import { convertMinutesToMilliseconds } from '../../../helpers/minuteToMiliseconds';
import { AttendimentRepository } from '../../../infra/repositories/Attendiment';
import { ConsultantRepository } from '../../../infra/repositories/Consultant';
import { Sender } from '../../../infra/whatsapp/Sender';
import { Client } from '../../entities/Client';
import { Consultant } from '../../entities/Consultant';
import { WaitMessage } from './WaitMessage';

export class CloseSessionCommand extends WaitMessage {
  constructor(
    private readonly consultantRepository: ConsultantRepository,
    private readonly attendimentRepository: AttendimentRepository,
    protected readonly sender: Sender
  ) {
    super(sender);
  }
  async execute(consultant: Consultant): Promise<boolean> {
    if (consultant.clientCurrent) {
      const sendedMessageClosseSession = await this.sender.sendText(
        consultant.telephone,
        '*ATENÇÃO:* _Você realmente deseja encerrar o atendimento?_ \n Apenas (*SIM* ou *NÃO*)'
      );
      if (sendedMessageClosseSession) {
        const MAX_TIME_OUT = convertMinutesToMilliseconds(10);
        const ResolvedValue = 'SIM';
        const RejectedValue = 'NÃO';
        const response = await this.waitForResponseFromConsultant(consultant.telephone, MAX_TIME_OUT, RejectedValue);

        if (response.toUpperCase().includes(ResolvedValue)) {
          const consultantAfterCloseAttendiment = await this.consultantRepository.updateClientCurrent(
            consultant._id,
            {} as Client
          );

          if (consultantAfterCloseAttendiment) {
            await this.sender.sendText(consultant.telephone, '_Atendimento encerrado!_');
            await this.attendimentRepository.create({
              attendimentStars: 0,
              avaliation: [],
              consultant: consultantAfterCloseAttendiment,
              client: consultant.clientCurrent,
              date: new Date(),
            });
            return true;
          }
        }
      } else {
        await this.sender.sendText(
          consultant.telephone,
          `_O atendimento com o cliente ${consultant.clientCurrent?.name} não foi encerrado!_`
        );
      }
    } else {
      await this.sender.sendText(consultant.telephone, 'Você não está em um atendimento para encerra-lo!');
    }
    return false;
  }
}
