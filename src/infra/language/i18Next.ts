import { InitOptions } from 'i18next';
import { join } from 'path';
import fs from 'fs';

const lng = 'pt-BR';
const files = fs.readdirSync(join(__dirname, '../../../locales/' + lng));

const configI18N: InitOptions = {
  fallbackLng: lng,
  debug: false,
  ns: files.map((file: string) => {
    return file.split('.')[0];
  }),
  backend: {
    loadPath: join(__dirname, '../../../locales/{{lng}}/{{ns}}.json'),
  },
};

export default configI18N;
