import { Sender } from '../../../infra/whatsapp/Sender';
import { Consultant } from '../../entities/Consultant';
import { ICommand } from './interfaces/command';

export class CloseSessionCommand implements ICommand {
  constructor(private readonly sender: Sender) {}

  async execute(consultant: Consultant, contentNextMessageClient: () => Promise<string>): Promise<void> {
    this.sender.sendText(
      consultant.telephone,
      '*ATENÇÃO:* _Você realmente deseja encerrar o atendimento?_ \n Apenas (*SIM* ou *NÃO*)'
    );

    const message = await contentNextMessageClient();
    if (message) {
      // if (clientCurrent?._id) {
      //   await consultantRepository.updateClientCurrent(_id, clientCurrentEmpty)
      //   const attendimentCreated = await attendimentRepository.create({
      //     attendimentStars: 5,
      //     avaliation: [
      //       {
      //         content: 'OK',
      //       },
      //     ],
      //     consultant: consultant,
      //     date: new Date(),
      //     client: clientCurrent,
      //   })
      //   if (attendimentCreated?.number) {
      //     this.sender.sendText(
      //       consultant.telephone,
      //       `_Atendimento *#${attendimentCreated.number}* Encerrado com Sucesso_`
      //     )
      //   }
      //   logger.error(
      //     `
      // Erro ao encerrar o Atendimento. Erro:` + JSON.stringify(attendimentCreated)
      //   )
    }
    this.sender.sendText(consultant.telephone, 'Você não está em um atendimento!.');
  }
}
