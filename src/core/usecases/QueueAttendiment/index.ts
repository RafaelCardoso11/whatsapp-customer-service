import { logger } from '../../../infra/logger/logger';
import { ConsultantRepository } from '../../../infra/repositories/Consultant';
import { QueueAttendimentRepository } from '../../../infra/repositories/QueueAttendiment';
import { Client } from '../../entities/Client';
import { QueueAttendiment as QueueAttendimentEntity } from '../../entities/QueueAttendiment';

export class QueueAttendimentUseCase {
  constructor(
    private readonly queueAttendimentRepository: QueueAttendimentRepository,
    private readonly consultantRepository: ConsultantRepository
  ) {}

  public async add(client: Client, message: string): Promise<QueueAttendimentEntity> {
    return await this.queueAttendimentRepository.add({ client, message: { content: message } });
  }

  public async getTheFistInQueue(): Promise<QueueAttendimentEntity> {
    return await this.queueAttendimentRepository.getTheFistInQueue();
  }
  public async removeById(idAttendiment: string): Promise<QueueAttendimentEntity> {
    return await this.queueAttendimentRepository.removeById(idAttendiment);
  }
  public async clientInQueueAttendiment(telephoneClient: string): Promise<QueueAttendimentEntity> {
    return await this.queueAttendimentRepository.getByTelephone(telephoneClient);
  }

  public async saveMessageInAttendiment(
    telephoneClient: string,
    contentMessage: string
  ): Promise<QueueAttendimentEntity> {
    return await this.queueAttendimentRepository.updateMessages(telephoneClient, contentMessage);
  }

  public async removeQueueAttendimentAndRemoveClientCurrent(idConsultant: string): Promise<void> {
    try {
      const theFirstInQueue = await this.queueAttendimentRepository.getTheFistInQueue();

      if (theFirstInQueue) {
        await this.queueAttendimentRepository.removeById(theFirstInQueue._id);

        await this.consultantRepository.removeClientCurrentPropertyFromConsultant(idConsultant);
      }
    } catch (error) {
      logger.info('Nenhum cliente na fila de atendimento');
    }
  }
}
