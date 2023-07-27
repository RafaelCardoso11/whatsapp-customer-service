import { ECommand } from '../../../enums/ECommand';

export const CommandsWithDescription = {
  [ECommand.listCommands]: 'Mostra todos os comandos',
  [ECommand.CloseSession]: 'Encerra o atendimento',
  [ECommand.WaClientLink]: 'Gera o link do WhatsApp do cliente',
  [ECommand.ChangeConsultant]:
    'O consultor poderá alterar o atendimento para outro consultor caso não esteja disponível',
  [ECommand.CalculateUber]: 'Para calcular o frete por Uber *(Em Breve)*',
  [ECommand.OpenChatGPT]:
    'O consultor poderá conversar com o ChatGPT caso precise de algum auxílio na conversa *(Em Breve)*',
  [ECommand.CloseChatGPT]: 'O consultor poderá fechar o auxílio com o ChatGPT *(Em Breve)*',
  [ECommand.ActivateAIAssistance]: 'Ativa o modo atendimento por IA *(Em Breve)*',
  [ECommand.DeactivateAIAssistance]: 'Fecha o modo atendimento por IA *(Em Breve)*',
};
