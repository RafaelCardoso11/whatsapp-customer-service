import { LoggerAdapter } from '../../adapters/LoggerAdapter';
import { ILogger } from '../../adapters/interfaces/logger';
import PinoLogger from './pino';

export const logger: ILogger = new LoggerAdapter(PinoLogger);
