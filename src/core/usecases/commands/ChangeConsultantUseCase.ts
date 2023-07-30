import { Consultant } from '../../entities/Consultant';

import { ICommand } from './interfaces/command';

export class ChangeConsultantCommand implements ICommand {
  async execute(consultant: Consultant): Promise<boolean> {
    `O atendimento foi enviado para o Consultor ${consultant.name}`;
    return true;
  }
}
