import { Client } from './Client';

class QueueAttendiment {
  client: Client;
  number?: number;
  date?: Date;
  constructor(client: Client) {
    this.client = client;
  }
}

export { QueueAttendiment };
