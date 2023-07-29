import { EventEmitter } from 'events';

export class ResponseEmitter {
  private readonly emitter: EventEmitter;

  constructor() {
    this.emitter = new EventEmitter();
  }
  emit(eventName: string, value: string) {
    this.emitter.emit(eventName, value);
  }
  async getValueEvent(eventName: string, MAX_TIME_OUT: number, rejectValue: string) {
    return new Promise<string>((resolve) => {
      const resolveWithValueRejectTimeout = setTimeout(() => {
        resolve(rejectValue);
      }, MAX_TIME_OUT);

      this.emitter.on(eventName, (param: string) => {
        clearTimeout(resolveWithValueRejectTimeout);
        resolve(param);
      });
    });
  }
}

export default new ResponseEmitter();
