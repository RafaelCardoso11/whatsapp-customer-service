import Odm from '../../infra/odm/odm';

const QueueAttendimentSchema = Odm.createSchema({
  _id: { type: Odm.Schema.Types.ObjectId, auto: true },
  client: { type: 'object', required: true },
  number: { type: 'number', unique: true },
  date: { type: 'date', required: true },
  messagens: {
    type: [
      {
        _id: {
          type: Odm.Schema.Types.ObjectId,
          unique: true,
          auto: true,
        },
        content: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          required: true,
        },
      },
    ],
    required: true,
  },
});

export const QueueAttendimentModel = Odm.createModel('queue-Attendiments', QueueAttendimentSchema);
