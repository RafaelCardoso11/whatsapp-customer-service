import { ConsultantModel } from '../../core/schemas/ConsultantSchema';
import { Consultant } from '../../core/entities/Consultant';
import { Client } from '../../core/entities/Client';

class ConsultantRepository {
  async create(consultant: Consultant): Promise<Consultant | null> {
    try {
      const created = (await ConsultantModel.create(consultant)).toJSON() as Consultant;
      return created;
    } catch (error) {
      return null;
    }
  }
  async update(consultant: Consultant): Promise<Consultant | null> {
    try {
      const updated = (await ConsultantModel.findOneAndUpdate(consultant)).toJSON() as Consultant;
      return updated;
    } catch (error) {
      return null;
    }
  }
  async getById(id: string): Promise<Consultant | null> {
    try {
      const consultant = await ConsultantModel.findById(id).exec();
      return consultant;
    } catch (error) {
      return null;
    }
  }
  async getByTelephone(telephone: string): Promise<Consultant | null> {
    try {
      const consultant = await ConsultantModel.findOne({ telephone }).exec();
      return consultant;
    } catch (error) {
      return null;
    }
  }
  async getAll(): Promise<Consultant[] | null> {
    try {
      const consultants = await ConsultantModel.find().exec();
      return consultants.map((consultant) => consultant.toObject() as Consultant);
    } catch (error) {
      return null;
    }
  }
  async findConsultantAvailable(): Promise<Consultant> {
    const consultantAvailable = await ConsultantModel.findOne({
      clientCurrent: { $exists: false },
    }).exec();
    return consultantAvailable.toObject();
  }
  async findConsultantByIdClient(idClient: string): Promise<Consultant | null> {
    try {
      const consultantAvailable = await ConsultantModel.findOne({
        clientCurrent: { _id: idClient },
      }).exec();
      return consultantAvailable.toObject();
    } catch (error) {
      return null;
    }
  }
  async findByTelephoneClient(telephone: string): Promise<Consultant | null> {
    try {
      const consultant = await ConsultantModel.findOne({ 'clientCurrent.telephone': telephone }).exec();

      return consultant.toObject();
    } catch (error) {
      return null;
    }
  }

  async updateClientCurrent(idConsultant: string, clientCurrent: Client): Promise<Consultant> {
    const consultantUpdated = await ConsultantModel.findOneAndUpdate(
      { _id: idConsultant },
      {
        $set: {
          clientCurrent,
        },
      }
    ).exec();

    return consultantUpdated.toObject();
  }
}

export { ConsultantRepository };
