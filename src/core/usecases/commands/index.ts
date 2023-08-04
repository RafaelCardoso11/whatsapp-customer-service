import { ECommand } from '../../../enums/ECommand';
import { commandSuggestion } from '../../../helpers/commandSuggestion';

import { LanguageManagerSingleton } from '../../../infra/language';
import { AttendimentRepository } from '../../../infra/repositories/Attendiment';
import { ConsultantRepository } from '../../../infra/repositories/Consultant';
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

  constructor(
    private readonly sender: Sender,
    readonly consultantRepository: ConsultantRepository,
    readonly attendimentRepository: AttendimentRepository
  ) {
    this.registerCommand(ECommand.listCommands, new ListCommandsCommand(sender));
    this.registerCommand(
      ECommand.CloseSession,
      new CloseSessionCommand(consultantRepository, attendimentRepository, sender)
    );
    this.registerCommand(ECommand.WaClientLink, new GenerateWhatsappLinkCommandCommand(sender));
    this.registerCommand(ECommand.ChangeConsultant, new ChangeConsultantCommand(consultantRepository, sender));
  }

  private async registerCommand(name: string, command: ICommand): Promise<void> {
    this.commands.set(name, command);
  }

  async executeCommand(consultant: Consultant, command: string): Promise<boolean> {
    const getCommand = this.commands.get(command);

    if (getCommand) {
      return await getCommand.execute(consultant);
    } else {
      await this.sender.sendText(consultant.telephone, LanguageManagerSingleton.translate('commands:'));

      const suggestion = commandSuggestion(command, this.Commands);

      if (suggestion) {
        await this.sender.sendText(consultant.telephone, suggestion);
      }
      return false;
    }
  }

  get Commands(): string[] {
    return Object.keys(CommandsWithDescription);
  }
}
