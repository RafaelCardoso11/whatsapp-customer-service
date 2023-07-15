import { Response, Request } from "express";
import { ConsultantRepository } from "../repositories/Consultant";
import { Consultant } from "../entities/Consultant";

export class ConsultantController {
  private consultantRepository: ConsultantRepository;

  constructor() {
    this.consultantRepository = new ConsultantRepository();
  }

  async getAll(req: Request, res: Response): Promise<void> {
    const consultants = await this.consultantRepository.getAll();

    if (consultants) {
      res.json(consultants);
    }
  }
  async getById(req: Request, res: Response): Promise<void> {
    const id: string = req.params.id;

    const consultant = await this.consultantRepository.getById(id);

    if (consultant) {
      res.json(consultant);
    } else {
      res.status(404).json({ error: "Consultant not found" });
    }
  }
  async register(req: Request, res: Response): Promise<void> {
    const { name, number } = req.body as Consultant;

    const consultant = await this.consultantRepository.create({
      name,
      number,
    });

 

    if (consultant) {
      res.json(consultant);
    }
  }
}
