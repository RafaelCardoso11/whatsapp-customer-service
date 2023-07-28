import { QueueAttendimentRepository } from '../../../infra/repositories/QueueAttendiment';
import { Client } from '../../entities/Client';
import { QueueAttendiment as QueueAttendimentEntity } from '../../entities/QueueAttendiment';

export class QueueAttendimentUseCase {
  constructor(private readonly queueAttendiment: QueueAttendimentRepository) {}

  public async add(client: Client, message: string): Promise<QueueAttendimentEntity> {
    return await this.queueAttendiment.add({ client, message: { content: message } });
  }

  public async remove(idAttendiment: string): Promise<QueueAttendimentEntity> {
    return await this.queueAttendiment.remove(idAttendiment);
  }
  public async clientInQueueAttendiment(telephoneClient: string): Promise<QueueAttendimentEntity> {
    return await this.queueAttendiment.getByTelephone(telephoneClient);
  }

  public async saveMessageInAttendiment(
    telephoneClient: string,
    contentMessage: string
  ): Promise<QueueAttendimentEntity> {
    return await this.queueAttendiment.updateMessages(telephoneClient, contentMessage);
  }
}
