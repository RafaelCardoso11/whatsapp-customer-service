import ResponseEmitter from './ResponseEmitterSingleton';

export class ResponseClientEmitter {
  async waitMessage(clientTelephone: string, MAX_TIME_OUT: number, rejectValue: string): Promise<string> {
    const eventName = `message:${clientTelephone}`;

    return ResponseEmitter.getValueEvent(eventName, MAX_TIME_OUT, rejectValue);
  }
}
