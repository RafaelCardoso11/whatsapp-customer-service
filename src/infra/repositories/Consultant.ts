import { ConsultantModel } from '../../core/schemas/ConsultantSchema'
import { Consultant } from '../../core/entities/Consultant'
import { Client } from '../../core/entities/Client'

class ConsultantRepository {
  async getById(id: string): Promise<Consultant | null> {
    const consultant = await ConsultantModel.findById(id).exec()
    return consultant ? (consultant.toObject() as Consultant) : null
  }
  async getByTelephone(telephone: string): Promise<Consultant | null> {
    const consultant = await ConsultantModel.findOne({ telephone }).exec()
    return consultant ? (consultant.toObject() as Consultant) : null
  }
  async getAll(): Promise<Consultant[]> {
    const consultants = await ConsultantModel.find().exec()
    return consultants.map((consultant) => consultant.toObject() as Consultant)
  }
  async findConsultantAvailable(): Promise<Consultant> {
    const consultantAvailable = await ConsultantModel.findOne({ clientCurrent: { $exists: false } }).exec()

    if (!consultantAvailable) {
      throw new Error(consultantAvailable)
    }
    return consultantAvailable.toObject() as Consultant
  }
  async findConsultantByIdClient(idClient: string): Promise<Consultant | null> {
    const consultantAvailable = await ConsultantModel.findOne({ clientCurrent: { _id: idClient } }).exec()
    return consultantAvailable ? (consultantAvailable.toObject() as Consultant) : null
  }

  async updateClientCurrent(idConsultant: string, clientCurrent: Client): Promise<Consultant | null> {
    const consultantUpdated = await ConsultantModel.findOneAndUpdate(
      { _id: idConsultant },
      {
        $set: {
          clientCurrent: clientCurrent,
        },
      }
    ).exec()

    return consultantUpdated ? (consultantUpdated.toObject() as Consultant) : null
  }
  // async updateConsultant(idConsultant: string, clientCurrent: Client) {
  //   const consultants = await this.getAll()
  //   const consultantWithClientEmpty = consultants.find(({ clientCurrent }) => clientCurrent)

  //   if (consultantWithClientEmpty) {
  //     // this.updateClientCurrent(idConsultant, clientCurrentEmpty) todo: deve remover o client do consultor
  //     const newConsultant = await this.getById('')
  //     this.updateClientCurrent(idConsultant, clientCurrent)
  //     return newConsultant
  //   } else {
  //     logger.info('Nenhum consultor disponível')
  //   }
  //   return consultantWithClientEmpty
  // }
  async create(consultant: { name: string; telephone: string }): Promise<Consultant | null> {
    const created = (await ConsultantModel.create(consultant)).toJSON() as Consultant

    if (created) {
      return created
    }
    return null
  }
}

export { ConsultantRepository }
