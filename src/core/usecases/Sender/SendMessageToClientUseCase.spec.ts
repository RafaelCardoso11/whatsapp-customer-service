import constants from '../../../constants';
import { Sender } from '../../../infra/whatsapp/Sender';
import { Client } from '../../entities/Client';
import { Consultant } from '../../entities/Consultant';
import { formatterMessageToClient } from '../../../helpers/formatterMessageToClient';
import { WhatsappClientMemoryFactory } from '../../../infra/whatsapp/ClientMemoryFactory';
import { SenderUseCase } from '.';

describe('SendMessageToClientUseCase', () => {
  let sender: Sender;
  let senderUseCase: SenderUseCase;

  beforeEach(() => {
    const clientWhatsapp = WhatsappClientMemoryFactory.create();
    clientWhatsapp.initialize();

    sender = WhatsappClientMemoryFactory.sender;
    senderUseCase = WhatsappClientMemoryFactory.senderUseCase;
  });

  it('should send message text formatted to client with name consultant', async () => {
    const client: Client = {
      name: 'Rafael',
      telephone: '9196320038',
    };
    const consultant: Consultant = {
      _id: '1',
      name: 'Rebeca',
      telephone: '9196320038',
    };

    const message = 'Olá, tudo bem?';

    const messageToClient = await senderUseCase.sendFormattedMessageToClient(
      client.telephone,
      consultant.name,
      message
    );

    const messageWithNameClient = formatterMessageToClient(consultant.name, message);

    expect(messageToClient).toEqual({ to: client.telephone, content: messageWithNameClient });
  });
  it('should send two messages to the client. One waiting for a consultant and outher asking for information to speed up customer service', async () => {
    const senderSpy = jest.spyOn(sender, 'sendText');

    const client = new Client('1', 'Rafael', '9196320038');

    const sended = await senderUseCase.newAttendiment(client.telephone);

    const { MESSAGE_WAIT_FOR_CONSULTANT, MESSAGE_TO_ACCELERATE_ATTENDANCE } = constants.sucess_to_whatsapp;

    expect(senderSpy).toBeCalledTimes(2);
    expect(senderSpy).toHaveBeenCalledWith(client.telephone, MESSAGE_WAIT_FOR_CONSULTANT);
    expect(senderSpy).toHaveBeenCalledWith(client.telephone, MESSAGE_TO_ACCELERATE_ATTENDANCE);
    expect(sended).toBeTruthy();
  });
});
