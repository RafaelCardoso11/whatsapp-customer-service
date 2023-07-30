import { Consultant } from '../../core/entities/Consultant';
import { Client } from '../../core/entities/Client';
import { ConsultantRepository } from './Consultant';

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
  ];

  async create(consultant: Consultant): Promise<Consultant> {
    this.consultants.push(consultant);
    return consultant;
  }
  async update(consultant: Consultant): Promise<Consultant> {
    const indexConsultant = this.consultants.findIndex(({ _id }) => consultant._id === _id);

    return (this.consultants[indexConsultant] = consultant);
  }
  async getById(id: string): Promise<Consultant> {
    const consultantById = this.consultants.find(({ _id }) => String(_id) === id);

    return consultantById as Consultant;
  }
  async getByTelephone(telephone: string): Promise<Consultant> {
    const consultantByTelephone = this.consultants.find(({ telephone: TP }) => TP === telephone);

    return consultantByTelephone as Consultant;
  }
  async getAll(): Promise<Consultant[]> {
    const consultants = this.consultants;

    return consultants;
  }
  async findConsultantAvailable(): Promise<Consultant> {
    const consultantAvailable = this.consultants.find(({ clientCurrent }) => !clientCurrent);

    return consultantAvailable as Consultant;
  }
  async findConsultantByIdClient(idClient: string): Promise<Consultant> {
    const consultantByIdClient = this.consultants.find(({ clientCurrent }) => clientCurrent?._id === idClient);
    return consultantByIdClient as Consultant;
  }
  async findByTelephoneClient(telephone: string): Promise<Consultant> {
    const consultantByTelephoneClient = this.consultants.find(
      ({ clientCurrent }) => clientCurrent?.telephone === telephone
    );

    return consultantByTelephoneClient as Consultant;
  }

  async updateClientCurrent(idConsultant: string, clientCurrent: Client): Promise<Consultant> {
    const indexConsultantById = this.consultants.findIndex(({ _id }) => _id === idConsultant);

    const consultantByIndex = this.consultants[indexConsultantById];
    consultantByIndex.clientCurrent = clientCurrent;

    return consultantByIndex;
  }
  async removeClientCurrentPropertyFromConsultant(idConsultant: string): Promise<void> {
    const indexConsultantById = this.consultants.findIndex(({ _id }) => _id === idConsultant);

    const consultantByIndex = this.consultants[indexConsultantById];
    consultantByIndex.clientCurrent = undefined;
  }
}

export { ConsultantRepositoryMemory };
