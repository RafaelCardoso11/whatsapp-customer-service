import Odm from '../../infra/odm/odm';

const ConsultantSchema = Odm.createSchema({
  _id: { type: Odm.Schema.Types.ObjectId, auto: true },
  name: {
    type: 'string',
    required: true,
  },
  number: {
    type: 'string',
    required: true,
  },
  clientCurrent: {
    _id: { type: Odm.Schema.Types.ObjectId, auto: true },
    name: { type: 'string', required: false, default: '' },
    number: { type: 'string', required: false, default: '' },
  },
});
export const ConsultantModel = Odm.createModel('Consultants', ConsultantSchema);
