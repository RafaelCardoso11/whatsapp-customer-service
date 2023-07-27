import { QueueAttendimentRepository } from '../../../infra/repositories/QueueAttendiment';
import { Client } from '../../entities/Client';
import { QueueAttendiment as QueueAttendimentEntity } from '../../entities/QueueAttendiment';

export class QueueAttendimentUseCase {
  constructor(private readonly queueAttendiment: QueueAttendimentRepository) {}

  public async add(client: Client): Promise<QueueAttendimentEntity> {
    return await this.queueAttendiment.add({ client });
  }

  public async remove(idAttendiment: string): Promise<QueueAttendimentEntity> {
    return await this.queueAttendiment.remove(idAttendiment);
  }
}
