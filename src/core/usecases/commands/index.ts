import { ECommand } from '../../../enums/ECommand';
import { formatterCommandInvalid } from '../../../helpers/formatterCommadInvalid';
import { formatterCommandWithSuggestion } from '../../../helpers/formatterCommandWithSuggestion';
import { Sender } from '../../../infra/whatsapp/Sender';
import { Consultant } from '../../entities/Consultant';
import { ChangeConsultantCommand } from './ChangeConsultantUseCase';
import { CloseSessionCommand } from './CloseSessionCommandUseCase';
import { GenerateWhatsappLinkCommandCommand } from './GenerateWhatsappLinkCommandUseCase';
import { ListCommandsCommand } from './ListCommandsUseCase';
import { CommandsWithDescription } from './commands';
import { ICommand } from './interfaces/command';

export class CommandsUseCase {
  private commands: Map<string, ICommand> = new Map();

  constructor(private readonly sender: Sender) {
    this.registerCommand(ECommand.listCommands, new ListCommandsCommand(sender));
    this.registerCommand(ECommand.CloseSession, new CloseSessionCommand(sender));
    this.registerCommand(ECommand.WaClientLink, new GenerateWhatsappLinkCommandCommand());
    this.registerCommand(ECommand.ChangeConsultant, new ChangeConsultantCommand());
  }

  private async registerCommand(name: string, command: ICommand): Promise<void> {
    this.commands.set(name, command);
  }

  async executeCommand(consultant: Consultant, command: string): Promise<void> {
    const getCommand = this.commands.get(command);

    if (getCommand) {
      await getCommand.execute(consultant);
    } else {
      await this.sender.sendText(consultant.telephone, formatterCommandInvalid(command));

      const commandSuggestion = formatterCommandWithSuggestion(command, this.Commands);

      if (commandSuggestion) {
        await this.sender.sendText(consultant.telephone, commandSuggestion);
      }
    }
  }

  get Commands(): string[] {
    return Object.keys(CommandsWithDescription);
  }
}
