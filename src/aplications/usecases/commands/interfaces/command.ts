import { Consultant } from "../../../../infrastructure/database/entities/Consultant";

export interface ICommand {
  execute(consultant?: Consultant): Promise<string> | string;
}
