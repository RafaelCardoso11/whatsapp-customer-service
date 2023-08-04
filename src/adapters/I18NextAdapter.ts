import i18next, { InitOptions, t } from 'i18next';
import { ILanguageManager } from './interfaces/languageManager';
import { logger } from '../infra/logger/logger';
import I18NexFsBackend from 'i18next-fs-backend';

class i18nextAdapter implements ILanguageManager {
  constructor(private initConfig: InitOptions) {}
  async initialize(): Promise<void> {
    try {
      await i18next.use(I18NexFsBackend).init(this.initConfig);
    } catch (error) {
      logger.error('Error to initialize i18next' + error);
    }
  }
  translate(path: string, options?: object): string {
    const namespace = path.split(':')[0];
    i18next.setDefaultNamespace(namespace);
    return t(path, options);
  }
}

export default i18nextAdapter;
