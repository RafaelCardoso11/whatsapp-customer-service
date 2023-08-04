import i18nextAdapter from '../../adapters/I18NextAdapter';
import { ILanguageManager } from '../../adapters/interfaces/languageManager';
import configI18N from './i18Next';

class LanguageManager {
  constructor(private readonly languageService: ILanguageManager) {}
  async initialize(): Promise<void> {
    try {
      await this.languageService.initialize();
    } catch (error) {
      throw new Error('Error to initialize language service');
    }
  }
  translate(path: string, options?: object): string {
    return this.languageService.translate(path, options);
  }
}
export const LanguageManagerSingleton = new LanguageManager(new i18nextAdapter(configI18N));
