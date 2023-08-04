import dotenv from 'dotenv';
dotenv.config();
import './infra/http/express';

import mongoURI from './infra/database/mongoDB';
import Odm from './infra/odm/odm';
import { WhatsappClientFactory } from './infra/whatsapp/ClientFactory';
import { LanguageManagerSingleton } from './infra/language';

async function startApp() {
  try {
    await LanguageManagerSingleton.initialize();
    await Odm.connection(mongoURI);

    const client = WhatsappClientFactory.create();
    await client.initialize();
  } catch (error) {
    throw new Error('Error to initialize App:' + error);
  }
}

startApp();
