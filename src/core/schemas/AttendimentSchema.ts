import Odm from '../../infra/odm/odm';

const AttendimentSchema = Odm.createSchema({
  _id: { type: Odm.Schema.Types.ObjectId, auto: true },
  attendimentStars: { type: 'number', required: true },
  avaliation: { type: 'object', required: true },
  consultant: { type: 'object', required: true },
  client: { type: 'object', required: true },
  number: { type: 'number', unique: true },
  date: { type: 'date', required: true },
});

export const AttendimentModel = Odm.createModel('attendiments', AttendimentSchema);
