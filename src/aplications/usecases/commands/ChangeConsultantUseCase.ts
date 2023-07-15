import { Consultant } from "../../../infrastructure/database/entities/Consultant";
import { ICommand } from "./interfaces/command";

export class ChangeConsultantCommand implements ICommand {
  execute(consultant: Consultant): string {
    return `O atendimento foi enviado para o Consultor ${consultant.name}`;
  }
}
