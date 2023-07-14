import { ConsultantModel } from "../schemas/ConsultantSchema";
import { Consultant } from "../entities/Consultant";

class ConsultantRepository {
  async getById(id: string): Promise<Consultant | null> {
    const consultant = await ConsultantModel.findById(id).exec();
    return consultant ? (consultant.toObject() as Consultant) : null;
  }
  async getAll(): Promise<Consultant[]> {
    const consultants = await ConsultantModel.find().exec();
    return consultants.map(consultant => consultant.toObject() as Consultant);
  }
}

export { ConsultantRepository };
