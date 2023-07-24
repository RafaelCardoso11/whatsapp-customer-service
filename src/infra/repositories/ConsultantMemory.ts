import { Consultant } from '../../core/entities/Consultant'
import { Client } from '../../core/entities/Client'
import { ConsultantRepository } from './Consultant'

class ConsultantRepositoryMemory implements ConsultantRepository {
  consultants: Consultant[] = [
    {
      _id: '64b8322bd8dd217af24f4267',
      name: 'Rafael Cardoso',
      telephone: '559196320038',
    },
    {
      _id: '64b8322bd8dd217af24f4267',
      name: 'Rebeca Tavares',
      telephone: '559196320037',
      clientCurrent: {
        _id: '64b8322bd8dd217af24f4267',
        name: 'Julia',
        telephone: '559196320035',
      },
    },
    {
      _id: '64b8322bd8dd217af24f4267',
      name: 'Wanderson Souza',
      telephone: '559196320036',
    },
  ]
  async getById(id: string): Promise<Consultant | null> {
    const consultantById = this.consultants.find(({ _id }) => String(_id) === id)

    return consultantById || null
  }
  async getByTelephone(telephone: string): Promise<Consultant | null> {
    const consultantByTelephone = this.consultants.find(({ telephone: TP }) => TP === telephone)

    return consultantByTelephone || null
  }

  async getAll(): Promise<Consultant[]> {
    return this.consultants
  }
  async findConsultantAvailable(): Promise<Consultant> {
    const consultantAvailable = this.consultants.find(({ clientCurrent }) => !clientCurrent)

    if (!consultantAvailable) {
      throw Error('Error to find available consultant')
    }

    return consultantAvailable
  }
  async findConsultantByIdClient(idClient: string): Promise<Consultant | null> {
    const consultantByIdClient = this.consultants.find(({ clientCurrent }) => clientCurrent?._id === idClient)

    return consultantByIdClient || null
  }
  async updateClientCurrent(idConsultant: string, clientCurrent: Client): Promise<Consultant | null> {
    const indexConsultantById = this.consultants.findIndex(({ _id }) => _id === idConsultant)
    this.consultants[indexConsultantById].clientCurrent = clientCurrent

    return this.consultants[indexConsultantById] || null
  }

  async create(consultant: Consultant): Promise<Consultant | null> {
    this.consultants.push(consultant)

    return consultant || null
  }
  remove(idConsultant: string): Promise<void | Error> {
    const indexConsultantById = this.consultants.findIndex(({ _id }) => _id === idConsultant)

    this.consultants.splice(indexConsultantById, 1)

    throw Error('Error removing Consultant: ' + idConsultant)
  }
}

export { ConsultantRepositoryMemory }
