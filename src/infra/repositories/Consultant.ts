import { ConsultantModel } from "../../core/schemas/ConsultantSchema";
import { Consultant } from "../../core/entities/Consultant";

class ConsultantRepository {
  async getById(id: string): Promise<Consultant | null> {
    const consultant = await ConsultantModel.findById(id).exec();
    return consultant ? (consultant.toObject() as Consultant) : null;
  }
  async getAll(): Promise<Consultant[]> {
    const consultants = await ConsultantModel.find().exec();
    return consultants.map((consultant) => consultant.toObject() as Consultant);
  }
  async updateClientCurrent(
    idConsultant: string,
    clientCurrent: {
      _id: string;
      name: string;
      number: string;
    }
  ): Promise<Consultant | null> {
    const consultantUpdated = await ConsultantModel.findOneAndUpdate(
      { _id: idConsultant },
      {
        $set: {
          clientCurrent: clientCurrent,
        },
      }
    ).exec();

    return consultantUpdated
      ? (consultantUpdated.toObject() as Consultant)
      : null;
  }
  async updateConsultant(
    idConsultant: string,
    clientCurrent: { _id: string; name: string; number: string }
  ) {
    const consultants = await this.getAll();
    const consultantWithClientEmpty = consultants.find(
      ({ clientCurrent: { _id } }) => _id === ""
    );

    if (consultantWithClientEmpty) {
      const clientCurrentEmpty = {
        _id: "",
        name: "",
        number: "",
      };
      this.updateClientCurrent(idConsultant, clientCurrentEmpty);
      const newConsultant = await this.getById(consultantWithClientEmpty?._id);
      this.updateClientCurrent(idConsultant, clientCurrent);
      return newConsultant;
    } else {
      console.log("Nenhum consultor disponível");
    }
    return consultantWithClientEmpty;
  }
  async create(consultant: {
    name: string;
    number: string;
  }): Promise<Consultant | null> {
    const created = (
      await ConsultantModel.create(consultant)
    ).toJSON() as Consultant;

    if (created) {
      return created;
    }
    return null;
  }
}

export { ConsultantRepository };
