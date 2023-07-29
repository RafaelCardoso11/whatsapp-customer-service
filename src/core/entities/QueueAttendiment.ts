import { Client } from './Client';

interface message {
  _id?: string;
  content: string;
  date?: Date;
}

class QueueAttendiment {
  _id: string;
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
