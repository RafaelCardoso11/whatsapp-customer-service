import constants from '../constants'
import suggestCorrection from 'didyoumean'

function formatterCommandWithSuggestion(command: string, commands: string[]): string | void {
  const { COMMAND_SUGGESTION } = constants.error

  const commandSuggestion = suggestCorrection(command, commands)
  if (commandSuggestion) {
    return COMMAND_SUGGESTION.replace('{commandSuggestion}', commandSuggestion as string)
  }
}

export { formatterCommandWithSuggestion }
