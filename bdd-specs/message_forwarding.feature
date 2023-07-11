Funcionalidade: Encaminhamento de Mensagem

Cenário: Encaminhar mensagem do cliente para o consultor disponível
Quando o cliente envia uma mensagem para o Whatsapp da Empresa
Então a mensagem do cliente deve ser encaminhada para um consultor disponível.
E a mensagem enviada deve conter as informações do remetente (nome, número e data/hora do envio)
Exemplo de Dados:
| Remetente | Número      | Data/Hora         | Mensagem     |
| Cliente   | 91996320038 | 08/07/2023, 13:05 | Olá, bom dia |

Cenário: Encaminhar resposta do consultor para o cliente
Quando o consultor responde a mensagem recebida do cliente
Então a resposta do consultor deve ser enviada para o cliente através do Whatsapp da Empresa
E a mensagem enviada deve conter as informações do consultor (nome) e a resposta do consultor
"""
Consultor Rafael
Olá, tudo bem? No que eu consigo ajuda-lo?
"""