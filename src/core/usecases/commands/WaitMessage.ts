import { ResponseConsultantEmitter } from '../../../infra/emitters/ResponseConsultant';
import { Sender } from '../../../infra/whatsapp/Sender';
import { Consultant } from '../../entities/Consultant';
import { ICommand } from './interfaces/command';

export abstract class WaitMessage implements ICommand {
  constructor(protected readonly sender: Sender) {}

  async waitForResponseFromConsultant(
    consultantTelephone: string,
    MAX_TIME_OUT: number,
    rejectValue: string
  ): Promise<string> {
    const response = new ResponseConsultantEmitter().waitMessage(consultantTelephone, MAX_TIME_OUT, rejectValue);

    return response;
  }

  abstract execute(consultant?: Consultant): Promise<boolean>;
}
