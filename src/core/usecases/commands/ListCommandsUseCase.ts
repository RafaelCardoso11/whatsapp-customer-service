import { Sender } from '../../../infra/Whatsapp/Sender'
import { Consultant } from '../../entities/Consultant'
import { CommandsWithDescription } from './commands'
import { ICommand } from './interfaces/command'

export class ListCommandsCommand implements ICommand {
  constructor(private readonly sender: Sender) {}

  async execute(consultant: Consultant): Promise<void> {
    await this.sender.sendText(consultant.telephone, this.listCommands())
  }

  private listCommands(): string {
    const commandList = Object.keys(CommandsWithDescription)
      .map((command) => `*${command}* - ${CommandsWithDescription[command as keyof typeof CommandsWithDescription]}`)
      .join('\n\n')
    return commandList
  }
}
