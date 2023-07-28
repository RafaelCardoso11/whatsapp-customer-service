import { Client } from './Client';

class QueueAttendiment {
  client: Client;
  number?: number;
  date?: Date;
  message: string;
  constructor(client: Client, message: string) {
    this.client = client;
    this.message = message;
  }
}

export { QueueAttendiment };
