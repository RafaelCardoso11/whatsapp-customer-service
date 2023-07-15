import { Consultant } from "../../../../infra/database/entities/Consultant";

export interface ICommand {
  execute(consultant?: Consultant): Promise<string> | string;
}
