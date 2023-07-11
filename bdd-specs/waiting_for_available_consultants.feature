Funcionalidade:  Consultores disponíveis para atender o cliente

Cenário: Enviar uma mensagem automática de espera por consultores disponíveis
Dado que um cliente enviou uma mensagem para o Whatsapp da Empresa com os seguintes dados:
| Remetente | Número      | Data/Hora         | Mensagem     |
| Cliente   | 91996320038 | 08/07/2023, 13:05 | Olá, bom dia |
Quando o sistema recebe a mensagem do cliente
Então o sistema envia duas mensagens automáticas de espera para o cliente
E a primeira mensagem enviada deve conter a seguinte informação:
"""
Olá, tudo bem? 😊
Em breve você será atendido por um de nossos consultores.
"""
E a segunda mensagem enviada deve conter a seguinte informação:
"""
Para agilizar o nosso atendimento informe o seu nome e dúvida/pedido
que já retornaremos.
"""





  

