import { Consultant } from '../../core/entities/Consultant'
import { Client } from '../../core/entities/Client'
import { ConsultantRepository } from './Consultant'
import {
  ConsultantCreationError,
  ConsultantFindByIdClientError,
  ConsultantFindByIdError,
  ConsultantFindByTelephoneClientError,
  ConsultantFindByTelephoneError,
  ConsultantFindConsultantAvaiableError,
  ConsultantGetAllError,
  ConsultantUpdateClientCurrentError,
  ConsultantUpdateError,
} from '../Errors/Consultant'

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

  async create(consultant: Consultant): Promise<Consultant> {
    if (this.consultants.push(consultant)) {
      return consultant
    }

    throw new ConsultantCreationError()
  }
  async update(consultant: Consultant): Promise<Consultant> {
    const indexConsultant = this.consultants.findIndex(({ _id }) => consultant._id === _id)

    if ((this.consultants[indexConsultant] = consultant)) {
      return consultant
    }

    throw new ConsultantUpdateError()
  }
  async getById(id: string): Promise<Consultant> {
    const consultantById = this.consultants.find(({ _id }) => String(_id) === id)
    if (consultantById) {
      return consultantById
    }
    throw new ConsultantFindByIdError()
  }
  async getByTelephone(telephone: string): Promise<Consultant> {
    const consultantByTelephone = this.consultants.find(({ telephone: TP }) => TP === telephone)

    if (consultantByTelephone) {
      return consultantByTelephone
    }
    throw new ConsultantFindByTelephoneError()
  }
  async getAll(): Promise<Consultant[]> {
    const consultants = this.consultants
    if (consultants) {
      return consultants
    }

    throw new ConsultantGetAllError()
  }
  async findConsultantAvailable(): Promise<Consultant> {
    const consultantAvailable = this.consultants.find(({ clientCurrent }) => !clientCurrent)
    if (consultantAvailable) {
      return consultantAvailable
    }
    throw new ConsultantFindConsultantAvaiableError()
  }
  async findConsultantByIdClient(idClient: string): Promise<Consultant> {
    const consultantByIdClient = this.consultants.find(({ clientCurrent }) => clientCurrent?._id === idClient)

    if (consultantByIdClient) {
      return consultantByIdClient
    }

    throw new ConsultantFindByIdClientError()
  }
  async findByTelephoneClient(telephone: string): Promise<Consultant> {
    const consultantByTelephoneClient = this.consultants.find(
      ({ clientCurrent }) => clientCurrent?.telephone === telephone
    )

    if (consultantByTelephoneClient) {
      return consultantByTelephoneClient
    }

    throw new ConsultantFindByTelephoneClientError()
  }

  async updateClientCurrent(idConsultant: string, clientCurrent: Client): Promise<Consultant> {
    const indexConsultantById = this.consultants.findIndex(({ _id }) => _id === idConsultant)

    const consultantByIndex = this.consultants[indexConsultantById]
    consultantByIndex.clientCurrent = clientCurrent

    if (consultantByIndex) {
      return consultantByIndex
    }

    throw new ConsultantUpdateClientCurrentError()
  }
}

export { ConsultantRepositoryMemory }
