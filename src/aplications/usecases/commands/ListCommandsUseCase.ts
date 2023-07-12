import { CommandsWithDescription } from "./commands";
import { ICommand } from "./interfaces/command";

export class ListCommandsCommand implements ICommand {
  execute(): string {
    return this.listCommands();
  }

  private listCommands(): string {
    const commandList = Object.keys(CommandsWithDescription)
      .map(
        (command) =>
          `*${command}* - ${
            CommandsWithDescription[
              command as keyof typeof CommandsWithDescription
            ]
          }`
      )
      .join("\n\n");
    return commandList;
  }
}
