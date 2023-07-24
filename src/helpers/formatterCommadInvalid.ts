import constants from '../constants'

function formatterCommandInvalid(command: string): string {
  const { COMMAND_INVALID } = constants.error

  return COMMAND_INVALID.replace('{command}', command)
}

export { formatterCommandInvalid }
