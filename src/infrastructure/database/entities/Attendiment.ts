interface IAvaliation {
  content: string;
}

interface IConsultant {
  name: string;
  number: string;
}

interface IClient {
  name: string;
  number: string;
}
class Attendiment {
  attendimentStars: number;
  avaliation: IAvaliation[];
  consultant: IConsultant;
  client: IConsultant;
  date: Date;
  constructor(
    attendimentStars: number,
    avaliation: IAvaliation[],
    consultant: IConsultant,
    client: IClient
  ) {
    this.attendimentStars = attendimentStars;
    this.avaliation = avaliation;
    this.consultant = consultant;
    this.client = client
  }
}

export { Attendiment };
