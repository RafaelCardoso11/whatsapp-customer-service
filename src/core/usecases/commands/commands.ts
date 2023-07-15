export enum Command {
  CloseSession = "#/encerrarAtendimento",
  CalculateUber = "#/calcularUber",
  WaClientLink = "#/waLinkCliente",
  OpenChatGPT = "#/abrirChatGPT",
  CloseChatGPT = "#/fecharChatGPT",
  ActivateAIAssistance = "#/atendimentoPorIA",
  DeactivateAIAssistance = "#/fecharAtendimentoPorIA",
  ChangeConsultant = "#/mudarConsultor",
  listCommands = "#/comandos",
}

export const CommandsWithDescription = {
  [Command.listCommands]: "Mostra todos os comandos",
  [Command.CloseSession]: "Encerra o atendimento",
  [Command.WaClientLink]: "Gera o link do WhatsApp do cliente",
  [Command.ChangeConsultant]:
    "O consultor poderá alterar o atendimento para outro consultor caso não esteja disponível",
  [Command.CalculateUber]: "Para calcular o frete por Uber *(Em Breve)*",
  [Command.OpenChatGPT]:
    "O consultor poderá conversar com o ChatGPT caso precise de algum auxílio na conversa *(Em Breve)*",
  [Command.CloseChatGPT]:
    "O consultor poderá fechar o auxílio com o ChatGPT *(Em Breve)*",
  [Command.ActivateAIAssistance]:
    "Ativa o modo atendimento por IA *(Em Breve)*",
  [Command.DeactivateAIAssistance]:
    "Fecha o modo atendimento por IA *(Em Breve)*",
};
