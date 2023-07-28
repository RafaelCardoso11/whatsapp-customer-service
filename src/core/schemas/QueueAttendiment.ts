import Odm from '../../infra/odm/odm';

const QueueAttendimentSchema = Odm.createSchema({
  _id: { type: Odm.Schema.Types.ObjectId, auto: true },
  client: { type: 'object', required: true },
  number: { type: 'number', unique: true },
  date: { type: 'date', required: true },
  messagens: { type: 'array', required: true },
});

export const QueueAttendimentModel = Odm.createModel('queue-Attendiments', QueueAttendimentSchema);
