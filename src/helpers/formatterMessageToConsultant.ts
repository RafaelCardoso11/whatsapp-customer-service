import constants from '../constants'
import { Client } from '../core/entities/Client'

function formatterMessageToConsultant(client: Client, message: string): string {
  const dateCurrent = new Date().toLocaleString('pt-BR')

  const { MESSAGE_WITH_INFO_CLIENT } = constants.sucess_to_whatsapp
  return MESSAGE_WITH_INFO_CLIENT.replace('{nameSaveClient}', String(client.nameSave))
    .replace('{nameClient}', client.name)
    .replace('{dateCurrent}', dateCurrent)
    .replace('{messageContent}', message)
}

export { formatterMessageToConsultant }
