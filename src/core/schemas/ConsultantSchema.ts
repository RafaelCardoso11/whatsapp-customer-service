import Odm from '../../infra/odm/odm';

const ConsultantSchema = Odm.createSchema({
  _id: { type: Odm.Schema.Types.ObjectId, auto: true },
  name: {
    type: 'string',
    required: true,
  },
  telephone: {
    type: 'string',
    required: true,
  },
  clientCurrent: {
    _id: { type: Odm.Schema.Types.ObjectId, auto: true },
    name: { type: 'string', required: true },
    nameSave: { type: 'string', required: true },
    telephone: { type: 'string', required: true },
  },
});
export const ConsultantModel = Odm.createModel('Consultants', ConsultantSchema);
