import { Consultant } from "../../../infra/database/entities/Consultant";
import { ChangeConsultantCommand } from "./ChangeConsultantUseCase";
import { CloseSessionCommand } from "./CloseSessionCommandUseCase";
import { GenerateWhatsappLinkCommandCommand } from "./GenerateWhatsappLinkCommandUseCase";
import { ListCommandsCommand } from "./ListCommandsUseCase";
import { Command, CommandsWithDescription } from "./commands";
import { ICommand } from "./interfaces/command";

export class CommandsUseCase {
  private commands: Map<string, ICommand> = new Map();

  constructor() {
    this.registerCommand(Command.listCommands, new ListCommandsCommand());
    this.registerCommand(Command.CloseSession, new CloseSessionCommand());
    this.registerCommand(
      Command.WaClientLink,
      new GenerateWhatsappLinkCommandCommand()
    );
    this.registerCommand(
      Command.ChangeConsultant,
      new ChangeConsultantCommand()
    );
  }

  private async registerCommand(
    name: string,
    command: ICommand
  ): Promise<void> {
    this.commands.set(name, command);
  }

  async executeCommand(consultant: Consultant, name: string): Promise<string> {
    const command = this.commands.get(name);
    if (command) {
      return await command.execute(consultant);
    } else {
      return `*Comando não reconhecido: ${name}.* _Listar comandos: #/comandos_`;
    }
  }

  get Commands(): string[] {
    const commands = Object.keys(CommandsWithDescription).map((command) => {
      return command;
    });
    return commands;
  }
}
