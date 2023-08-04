import suggestCorrection from 'didyoumean';
import { LanguageManagerSingleton } from '../infra/language';

function commandSuggestion(command: string, commands: string[]): string | void {
  const commandSuggestion = suggestCorrection(command, commands);
  if (commandSuggestion) {
    return LanguageManagerSingleton.translate('commands:COMMAND_SUGGESTION', { commandSuggestion });
  }
}

export { commandSuggestion };
