import { CommandsUseCase } from '../../core/usecases/Commands';
import { ConsultantUseCase } from '../../core/usecases/Consultant';
import { QueueAttendimentUseCase } from '../../core/usecases/QueueAttendiment';
import { SenderUseCase } from '../../core/usecases/Sender';
import { QueueAttendimentRepository } from '../repositories/QueueAttendiment';
import WhatsappClient from './Client';
import { Sender } from './Sender';
import { WhatsappClientDependencies } from './ClientDependencies';
import { ConsultantRepositoryMemory } from '../repositories/ConsultantMemory';
import SenderClientMockAdapter from '../../adapters/SenderClientMockAdapter';
import { WhatsappClientFactory } from './ClientFactory';
import { AttendimentRepository } from '../repositories/Attendiment';

export class WhatsappClientMemoryFactory implements WhatsappClientFactory {
  static senderUseCase: SenderUseCase;
  static sender: Sender;
  static clientMockAdapter: SenderClientMockAdapter;
  static queueAttendimentUseCase: QueueAttendimentUseCase;
  static consultantRepository: ConsultantRepositoryMemory;
  static queueAttendimentRepository: QueueAttendimentRepository;
  static commandsUseCase: CommandsUseCase;
  static consultantUseCase: ConsultantUseCase;
  static attendimentRepository: AttendimentRepository;

  static create(): WhatsappClient {
    this.clientMockAdapter = new SenderClientMockAdapter();
    this.sender = new Sender(this.clientMockAdapter);

    this.consultantRepository = new ConsultantRepositoryMemory();
    this.queueAttendimentRepository = new QueueAttendimentRepository();
    this.attendimentRepository = new AttendimentRepository();

    this.queueAttendimentUseCase = new QueueAttendimentUseCase(
      this.queueAttendimentRepository,
      this.consultantRepository
    );
    this.commandsUseCase = new CommandsUseCase(this.sender, this.consultantRepository, this.attendimentRepository);
    this.consultantUseCase = new ConsultantUseCase(this.consultantRepository);
    this.senderUseCase = new SenderUseCase(this.sender);

    const dependencies = new WhatsappClientDependencies(
      this.clientMockAdapter,
      this.queueAttendimentUseCase,
      this.commandsUseCase,
      this.consultantUseCase,
      this.senderUseCase
    );

    return new WhatsappClient(dependencies);
  }
}
