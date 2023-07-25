import { Consultant } from '../../../entities/Consultant'

export interface ICommand {
  execute(consultant?: Consultant, contentNextMessageClient?: () => Promise<string>): Promise<void> | string
}
