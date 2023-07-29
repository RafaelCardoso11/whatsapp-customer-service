import { Client } from './Client';

class Consultant {
  _id: string;
  name: string;
  telephone: string;
  clientCurrent?: Client;

  constructor(name: string, telephone: string, clientCurrent: Client) {
    this.name = name;
    this.telephone = telephone;
    this.clientCurrent = clientCurrent;
  }
}

export { Consultant };
