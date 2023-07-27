import { ILogger } from './interfaces/logger';

class LoggerAdapter implements ILogger {
  private logger: ILogger;
  constructor(logger: ILogger) {
    this.logger = logger;
  }
  info(message: string, ...args: unknown[]) {
    this.logger.info(message, args);
  }
  warn(message: string, ...args: unknown[]) {
    this.logger.warn(message, args);
  }
  error(message: string, ...args: unknown[]) {
    this.logger.error(message, args);
  }
  debug(message: string, ...args: unknown[]) {
    this.logger.debug(message, args);
  }
}
export { LoggerAdapter };
