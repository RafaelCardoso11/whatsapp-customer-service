import { ConsultantModel } from '../../core/schemas/ConsultantSchema';
import { Consultant } from '../../core/entities/Consultant';
import { logger } from '../logger/logger';
import { Client } from '../../core/entities/Client';

class ConsultantRepository {
  async getById(id: string): Promise<Consultant | null> {
    const consultant = await ConsultantModel.findById(id).exec();
    return consultant ? (consultant.toObject() as Consultant) : null;
  }
  async getAll(): Promise<Consultant[]> {
    const consultants = await ConsultantModel.find().exec();
    return consultants.map((consultant) => consultant.toObject() as Consultant);
  }
  async findConsultantWithoutClient(): Promise<Consultant | null> {
    const consultantsWithoutClient = await ConsultantModel.findOne({ clientCurrent: { $exists: false } }).exec();
    return consultantsWithoutClient ? (consultantsWithoutClient.toObject() as Consultant) : null;
  }
  async findConsultantByIdClient(idClient: string): Promise<Consultant | null> {
    const consultantsWithoutClient = await ConsultantModel.findOne({ clientCurrent: { _id: idClient } }).exec();
    return consultantsWithoutClient ? (consultantsWithoutClient.toObject() as Consultant) : null;
  }
  async updateClientCurrent(idConsultant: string, clientCurrent: Client): Promise<Consultant | null> {
    const consultantUpdated = await ConsultantModel.findOneAndUpdate(
      { _id: idConsultant },
      {
        $set: {
          clientCurrent: clientCurrent,
        },
      }
    ).exec();

    return consultantUpdated ? (consultantUpdated.toObject() as Consultant) : null;
  }
  async updateConsultant(idConsultant: string, clientCurrent: Client) {
    const consultants = await this.getAll();
    const consultantWithClientEmpty = consultants.find(({ clientCurrent: { _id } }) => _id === '');

    if (consultantWithClientEmpty) {
      const clientCurrentEmpty: Client = {
        name: '',
        telephone: '',
      };
      this.updateClientCurrent(idConsultant, clientCurrentEmpty);
      const newConsultant = await this.getById(consultantWithClientEmpty?._id);
      this.updateClientCurrent(idConsultant, clientCurrent);
      return newConsultant;
    } else {
      logger.info('Nenhum consultor disponível');
    }
    return consultantWithClientEmpty;
  }
  async create(consultant: { name: string; number: string }): Promise<Consultant | null> {
    const created = (await ConsultantModel.create(consultant)).toJSON() as Consultant;

    if (created) {
      return created;
    }
    return null;
  }
}

export { ConsultantRepository };
