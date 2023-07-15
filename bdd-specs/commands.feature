Funcionalidade: Comandos dos consultores

Cenário: Consultor poderá encerrar o atendimento
Dado que o consultor tenha atendido um cliente
E não restem mais dúvidas a serem respondidas
Quando o consultor enviar o comando "#/encerrarAtendimento"
Então o atendimento deverá ser encerrado

Cenário: Consultor poderá gerar o link do whatsapp do cliente
Dado que o consultor tenha atendido um cliente
Quando o consultor enviar o comando "#/waLinkCliente"
Então o consultor deverá receber um link que redireciona para o Whatsapp do Cliente

Cenário: Consultor poderá passar o atendimento do cliente para outro consultor
Dado que o consultor receba um novo atendimento
Quando o consultor enviar o comando "#/mudarConsultor"
Então o seu atendimento é passado para outro atendente

Cenário: Consultor poderá visualizar os comandos disponíveis
Quando o consultor solicitar a lista de comandos disponíveis através do comando "#/comandos"
Então uma lista contendo os comandos disponíveis deve ser exibida
E a lista de comandos deve incluir os seguintes itens:
  """
  #/encerrarAtendimento - Encerra o atendimento
  #/calcularUber (em breve) - receberá o cálculo do frete por Uber.
  #/waLinkCliente - Gera o link do WhatsApp do cliente.
  #/abrirChatGPT (Em breve) - O consultor poderá conversar com o ChatGPT caso precise de algum auxílio na conversa.
  #/fecharChatGPT (Em breve) - O consultor poderá fechar o auxílio com o ChatGPT
  #/atendimentoPorIA (Em breve) - Ativa o modo atendimento por IA.
  #/fecharAtendimentoPorIA (Em breve) - Fecha o modo atendimento por IA.
  #/mudarConsultor (Em breve) - O consultor poderá alterar o atendimento para outro consultor caso não esteja disponível.
  """