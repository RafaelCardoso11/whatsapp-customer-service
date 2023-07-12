import { ICommand } from "./interfaces/command";

export class ChangeConsultantCommand implements ICommand {
  execute(consultantAvailable: string): string {
    return `O atendimento foi enviado para o Consultor ${consultantAvailable}`;
  }
}
