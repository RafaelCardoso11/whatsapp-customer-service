import { Client } from './Client';
import { Consultant } from './Consultant';

interface IAvaliation {
  content: string;
}

class Attendiment {
  attendimentStars: number;
  avaliation: IAvaliation[];
  consultant: Consultant;
  client: Client;
  date: Date;
  constructor(attendimentStars: number, avaliation: IAvaliation[], consultant: Consultant, client: Client) {
    this.attendimentStars = attendimentStars;
    this.avaliation = avaliation;
    this.consultant = consultant;
    this.client = client;
  }
}

export { Attendiment };
