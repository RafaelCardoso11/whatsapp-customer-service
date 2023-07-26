const constants = {
  errors_to_whatsapp: {
    commands: {
      COMMAND_INVALID: `*Comando não reconhecido: {command}.* _Veja todos os comandos em #/comandos_`,
      COMMAND_SUGGESTION: `_Você quis dizer *{commandSuggestion}*_?`,
    },
    YOU_NOT_ARE_ATTENDIMENT: '_Você não está em um atendimento!_',
  },
  sucess_to_whatsapp: {
    NEW_CLIENT_FOR_CONSULTANT: '_Ei, Você tem um novo cliente para atender. O *{clientName}* está te esperando._',
    MESSAGE_WITH_NAME_CONSULTANT_AND_CONTENT: '*Consultor {consultantName}*\n{messageContent}',
    MESSAGE_WITH_INFO_CLIENT:
      '*Nome: {nameSaveClient} / {nameClient}*\n' + 'Data/Hora: {dateCurrent}\n' + 'Mensagem: {messageContent}',
    MESSAGE_WAIT_FOR_CONSULTANT_1: `Olá, tudo bem? 😊\n` + `Em breve você será atendido por um de nossos consultores.`,
    MESSAGE_WAIT_FOR_CONSULTANT_2: `Para agilizar o nosso atendimento informe o seu nome e dúvida/pedido que já retornaremos.`,
  },
  error: {
    consultant: {
      NO_AVAILABLE_CONSULTANT: 'Erro ao tentar encontrar um consultor disponível',
      FAILED_TO_CREATE_CONSULTANT: 'Erro ao tentar criar um consultor',
      FAILED_TO_UPDATED_CONSULTANT: 'Erro ao atualizaro o consultor',
      FAILED_TO_REGISTER_CLIENT_FOR_CONSULTANT: 'Erro ao cadastrar o cliente no consultor',
      CONSULTANT_NOT_FOUND: 'Consultor não encontrado',
      FAILED_TO_FIND_BY_ID: 'Erro ao tentar encontrar um consultor por ID',
      FAILED_TO_FIND_BY_ID_CLIENT: 'Erro ao tentar encontrar um consultor pelo ID do cliente',
      FAILED_TO_FIND_BY_TELEPHONE: 'Erro ao tentar encontrar um consultor por TELEPHONE',
      FAILED_TO_GET_ALL: 'Erro ao tentar buscar todos os consultores',
      FAILED_TO_UPDATED_CLIENT_CURRENT: "Erro ao tentar atualizar o cliente atual do consultor"
    },
  },
  sucess: {},
}

export default constants
