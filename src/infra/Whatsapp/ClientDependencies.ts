import { IWhatsappClient } from '../../adapters/interfaces/whatsappClient';
import { CommandsUseCase } from '../../core/usecases/Commands';
import { ConsultantUseCase } from '../../core/usecases/Consultant';
import { QueueAttendimentUseCase } from '../../core/usecases/QueueAttendiment';
import { SenderUseCase } from '../../core/usecases/Sender';

export class WhatsappClientDependencies {
  constructor(
    public client: IWhatsappClient,
    public queueAttendimentUseCase: QueueAttendimentUseCase,
    public commandsUseCase: CommandsUseCase,
    public consultantUseCase: ConsultantUseCase,
    public senderUseCase: SenderUseCase
  ) {}
}
