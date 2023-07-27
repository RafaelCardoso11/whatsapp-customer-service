import { Client } from './Client';

class QueueAttendiment {
  client: Client;
  number?: number;
  date?: Date;
  constructor(client: Client) {
    this.client = client;
    this.date = new Date();
  }
}

export { QueueAttendiment };
