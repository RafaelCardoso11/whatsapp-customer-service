import { ICommand } from "./interfaces/command";

export class CloseSessionCommand implements ICommand {
  execute(idClient: string): string {
    return `_Atendimento *#${1}* Encerrado com Sucesso_`;
  }
}
