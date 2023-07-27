import { logger } from '../logger/logger';
import { Attendiment } from '../../core/entities/Attendiment';
import { AttendimentModel } from '../../core/schemas/AttendimentSchema';

class AttendimentRepository {
  async create(attendiment: Attendiment): Promise<{ number: number; error?: unknown }> {
    try {
      const lastAttendiment = await AttendimentModel.findOne().sort({ _id: -1 }).exec();

      const numberIncremented = lastAttendiment ? lastAttendiment.number + 1 : 1;
      const created = (
        await AttendimentModel.create({
          ...attendiment,
          number: numberIncremented,
        })
      ).toJSON() as Attendiment;

      logger.info('Created attendiment number #', numberIncremented);
      return { ...created, number: numberIncremented };
    } catch (error) {
      return { number: 0, error };
    }
  }
}

export { AttendimentRepository };
