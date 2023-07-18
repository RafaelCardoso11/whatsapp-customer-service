export interface ILogger {
  info(message: string | unknown, ...args: unknown[]): void;
  warn(message: string | unknown, ...args: unknown[]): void;
  error(message: string | unknown, ...args: unknown[]): void;
  debug(message: string | unknown, ...args: unknown[]): void;
}
