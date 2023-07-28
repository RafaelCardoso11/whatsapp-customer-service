import { Client } from './Client';

interface message {
  _id?: string;
  content: string;
  date?: Date;
}

class QueueAttendiment {
  client: Client;
  number?: number;
  date?: Date;
  message: message;
  constructor(client: Client, message: message) {
    this.client = client;
    this.message = message;
  }
}

export { QueueAttendiment };
