import { Consultant } from '../../../entities/Consultant';

export interface ICommand {
  execute(consultant?: Consultant): Promise<boolean>;
}
