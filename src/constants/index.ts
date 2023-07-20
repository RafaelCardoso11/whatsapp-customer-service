const constants = {
  error: {
    NO_AVAILABLE_CONSULTANT: 'Nenhum consultor disponível',
    FAIL_TO_REGISTER_CLIENT_FOR_CONSULTANT: 'Erro ao cadastrar o cliente no Consultor.',
    FAIL_TO_UPDATE_CLIENT_FOR_CONSULTANT: 'Erro ao fazer o Update do cliente Atual no Consultor.',
  },
  sucess: {
    NEW_CLIENT_FOR_CONSULTANT: '_Ei, Você tem um novo cliente para atender. O *{clientName}* está te esperando._',
    MESSAGE_WITH_NAME_CONSULTANT_AND_CONTENT: '*Consultor ${consultantName}*\n${messageContent}',
    MESSAGE_WITH_INFO_CLIENT:
      '*Nome: ${nameSaveClient} / ${nameClient}*\n' + 
      'Data/Hora: ${dateCurrent}\n' + 
      'Mensagem: ${messageContent}',
  },
}

export default constants
