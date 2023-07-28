import { logger } from '../logger/logger';
import { QueueAttendiment } from '../../core/entities/QueueAttendiment';
import { QueueAttendimentModel } from '../../core/schemas/QueueAttendiment';

class QueueAttendimentRepository {
  async add({ client, date }: QueueAttendiment): Promise<QueueAttendiment> {
    const lastAttendiment = await QueueAttendimentModel.findOne().sort({ _id: -1 }).exec();

    const numberIncremented = lastAttendiment ? lastAttendiment.number + 1 : 1;

    const created = (
      await QueueAttendimentModel.create({
        client,
        date,
        number: numberIncremented,
      })
    ).toJSON() as QueueAttendiment;

    logger.info('Created attendiment in queue. Number #', numberIncremented);
    return created;
  }
  async remove(idAttendiment: string): Promise<QueueAttendiment> {
    const removed = (await QueueAttendimentModel.findByIdAndRemove(idAttendiment)).toJSON() as QueueAttendiment;

    logger.info('Removed attendiment to queue. Number #', removed.number);
    return removed;
  }
}

export { QueueAttendimentRepository };
