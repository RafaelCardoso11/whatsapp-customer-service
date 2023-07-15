import { Consultant } from "../../../infra/database/entities/Consultant";
import { AttendimentRepository } from "../../../infra/database/repositories/Attendiment";
import { ConsultantRepository } from "../../../infra/database/repositories/Consultant";
import { ICommand } from "./interfaces/command";

export class CloseSessionCommand implements ICommand {
  async execute(consultant: Consultant): Promise<string> {
    const { _id, name, number, clientCurrent } = consultant;
    const consultantRepository = new ConsultantRepository();
    const attendimentRepository = new AttendimentRepository();

    const clientCurrentEmpty = {
      _id: "",
      name: "",
      number: "",
    };
    if (clientCurrent._id) {
      await consultantRepository.updateClientCurrent(_id, clientCurrentEmpty);

      const attendimentCreated = await attendimentRepository.create({
        attendimentStars: 5,
        avaliation: [
          {
            content: "OK",
          },
        ],
        consultant: {
          name,
          number,
        },
        date: new Date(),
        client: clientCurrent,
      });

      if (attendimentCreated?.number) {
        return `_Atendimento *#${attendimentCreated.number}* Encerrado com Sucesso_`;
      }
      return (
        "Erro ao encerrar o Atendimento. Erro:" +
        JSON.stringify(attendimentCreated)
      );
    }
    return "Você não está em um atendimento!.";
  }
}
