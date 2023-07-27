import VenomClientAdapter from '../../adapters/VenomClientAdapter';
import { CommandsUseCase } from '../../core/usecases/Commands';
import { ConsultantUseCase } from '../../core/usecases/Consultant';
import { QueueAttendimentUseCase } from '../../core/usecases/QueueAttendiment';
import { SenderUseCase } from '../../core/usecases/Sender';
import { ConsultantRepository } from '../repositories/Consultant';
import { QueueAttendimentRepository } from '../repositories/QueueAttendiment';
import WhatsappClient from './Client';
import { Sender } from './Sender';
import { WhatsappClientDependencies } from './ClientDependencies';

export class WhatsappClientFactory {
  static create(): WhatsappClient {
    const client = new VenomClientAdapter();
    const sender = new Sender(client);

    const consultantRepository = new ConsultantRepository();
    const queueAttendimentRepository = new QueueAttendimentRepository();

    const commandsUseCase = new CommandsUseCase(sender);
    const queueAttendimentUseCase = new QueueAttendimentUseCase(queueAttendimentRepository);
    const consultantUseCase = new ConsultantUseCase(consultantRepository);
    const senderUseCase = new SenderUseCase(sender);

    const dependencies = new WhatsappClientDependencies(
      client,
      queueAttendimentUseCase,
      commandsUseCase,
      consultantUseCase,
      senderUseCase
    );

    return new WhatsappClient(dependencies);
  }
}
