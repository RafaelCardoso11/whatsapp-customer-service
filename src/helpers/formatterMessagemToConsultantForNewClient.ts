import constants from '../constants'

function formattedMessageNewClient(clientName: string): string {
  const { NEW_CLIENT_FOR_CONSULTANT } = constants.sucess_to_whatsapp
  return NEW_CLIENT_FOR_CONSULTANT.replace('{clientName}', clientName)
}

export { formattedMessageNewClient }
