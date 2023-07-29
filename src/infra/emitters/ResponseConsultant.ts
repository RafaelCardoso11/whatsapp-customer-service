import ResponseEmitter from './ResponseEmitterSingleton';
export class ResponseConsultantEmitter {
  async waitMessage(consultantTelephone: string, MAX_TIME_OUT: number, rejectValue: string): Promise<string> {
    const eventName = `message:${consultantTelephone}`;

    return ResponseEmitter.getValueEvent(eventName, MAX_TIME_OUT, rejectValue);
  }
}
