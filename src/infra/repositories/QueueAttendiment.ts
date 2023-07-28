import { logger } from '../logger/logger';
import { QueueAttendiment } from '../../core/entities/QueueAttendiment';
import { QueueAttendimentModel } from '../../core/schemas/QueueAttendiment';

class QueueAttendimentRepository {
  async add({ client, message }: QueueAttendiment): Promise<QueueAttendiment> {
    const lastAttendiment = await QueueAttendimentModel.findOne().sort({ _id: -1 }).exec();

    const numberIncremented = lastAttendiment ? lastAttendiment.number + 1 : 1;

    const attendiment = {
      client,
      date: new Date(),
      number: numberIncremented,
      messages: [message],
    };

    const created = (await QueueAttendimentModel.create(attendiment)).toJSON() as QueueAttendiment;

    logger.info('Created attendiment in queue. Number #', numberIncremented);
    return created;
  }
  async remove(idAttendiment: string): Promise<QueueAttendiment> {
    const removed = (await QueueAttendimentModel.findByIdAndRemove(idAttendiment)).toJSON() as QueueAttendiment;

    logger.info('Removed attendiment to queue. Number #', removed.number);
    return removed;
  }

  async getByTelephone(telephoneClient: string): Promise<QueueAttendiment> {
    const attendimentInQueue = await QueueAttendimentModel.findOne({ 'client.telephone': telephoneClient }).exec();

    return attendimentInQueue || null;
  }
  async updateMessages(telephoneClient: string, contentMessage: string): Promise<QueueAttendiment> {
    const message = { date: new Date(), content: contentMessage };

    const updated = await QueueAttendimentModel.findOneAndUpdate(
      { 'client.telephone': telephoneClient },
      { $push: { messagens: message } },
      { new: true }
    );

    return updated;
  }
}

export { QueueAttendimentRepository };
