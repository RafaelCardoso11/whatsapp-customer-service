import { ConsultantModel } from '../../core/schemas/ConsultantSchema'
import { Consultant } from '../../core/entities/Consultant'
import { Client } from '../../core/entities/Client'
import {
  ConsultantCreationError,
  ConsultantFindByIdError,
  ConsultantFindByTelephoneError,
  ConsultantFindByIdClientError,
  ConsultantFindByTelephoneClientError,
  ConsultantFindConsultantAvaiableError,
  ConsultantUpdateError,
  ConsultantGetAllError,
  ConsultantUpdateClientCurrentError,
} from '../errors/consultant'

class ConsultantRepository {
  async create(consultant: Consultant): Promise<Consultant> {
    try {
      const created = (await ConsultantModel.create(consultant)).toJSON() as Consultant
      return created
    } catch (error) {
      throw new ConsultantCreationError(JSON.stringify(error))
    }
  }
  async update(consultant: Consultant): Promise<Consultant> {
    try {
      const updated = (await ConsultantModel.findOneAndUpdate(consultant)).toJSON() as Consultant
      return updated
    } catch (error) {
      throw new ConsultantUpdateError(JSON.stringify(error))
    }
  }
  async getById(id: string): Promise<Consultant> {
    try {
      const consultant = await ConsultantModel.findById(id).exec()
      return consultant
    } catch (error) {
      throw new ConsultantFindByIdError(JSON.stringify(error))
    }
  }
  async getByTelephone(telephone: string): Promise<Consultant> {
    try {
      const consultant = await ConsultantModel.findOne({ telephone }).exec()
      return consultant
    } catch (error) {
      throw new ConsultantFindByTelephoneError(JSON.stringify(error))
    }
  }
  async getAll(): Promise<Consultant[]> {
    try {
      const consultants = await ConsultantModel.find().exec()
      return consultants.map((consultant) => consultant.toObject() as Consultant)
    } catch (error) {
      throw new ConsultantGetAllError(JSON.stringify(error))
    }
  }
  async findConsultantAvailable(): Promise<Consultant> {
    try {
      const consultantAvailable = await ConsultantModel.findOne({ clientCurrent: { $exists: false } }).exec()
      return consultantAvailable.toObject()
    } catch (error) {
      throw new ConsultantFindConsultantAvaiableError(JSON.stringify(error))
    }
  }
  async findConsultantByIdClient(idClient: string): Promise<Consultant> {
    try {
      const consultantAvailable = await ConsultantModel.findOne({ clientCurrent: { _id: idClient } }).exec()
      return consultantAvailable.toObject()
    } catch (error) {
      throw new ConsultantFindByIdClientError(JSON.stringify(error))
    }
  }
  async findByTelephoneClient(telephone: string): Promise<Consultant> {
    try {
      const consultant = await ConsultantModel.findOne({ clientCurrent: { telephone } }).exec()
      return consultant.toObject()
    } catch (error) {
      throw new ConsultantFindByTelephoneClientError(JSON.stringify(error))
    }
  }

  async updateClientCurrent(idConsultant: string, clientCurrent: Client): Promise<Consultant> {
    try {
      const consultantUpdated = await ConsultantModel.findOneAndUpdate(
        { _id: idConsultant },
        {
          $set: {
            clientCurrent,
          },
        }
      ).exec()

      return consultantUpdated.toObject()
    } catch (error) {
      throw new ConsultantUpdateClientCurrentError(JSON.stringify(error))
    }
  }
}

export { ConsultantRepository }
