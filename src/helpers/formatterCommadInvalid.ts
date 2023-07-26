import constants from '../constants'

function formatterCommandInvalid(command: string): string {
  const {
    commands: { COMMAND_INVALID },
  } = constants.errors_to_whatsapp

  return COMMAND_INVALID.replace('{command}', command)
}

export { formatterCommandInvalid }
