Funcionalidade: Avaliação do atendimento

Cenário: Avaliação do atendimento
Quando o atendimento tenha encerrado
Então o cliente receberá a seguinte mensagem de avaliação do atendimento:
"""
Ei, não esqueça de avaliar o seu atendimento! Essa etapa é muito importante.

Em uma escala de 1 a 5, qual o seu nível de satisfação pelo atendimento?
"""
E ao avaliar o atendimento, o sistema deve exibir a seguinte mensagem para melhoria no atendimento:
"""
Há algo que você gostaria que melhorasse?
"""
E quando o sistema receber a mensagem de melhoria no atendimento do cliente
Então o sistema deve enviar uma mensagem de agradecimento ao cliente por avaliar com a seguinte mensagem:
"""
Muito obrigado por avaliar! 🥰
"""
