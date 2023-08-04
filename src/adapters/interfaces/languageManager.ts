export interface ILanguageManager {
  initialize(): Promise<void>;
  translate(path: string, options?: object): string;
}
