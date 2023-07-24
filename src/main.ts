import dotenv from 'dotenv'
dotenv.config()
import './infra/http/express'

import { logger } from './infra/logger/logger'

import mongoURI from './infra/database/mongoDB'
import Odm from './infra/odm/odm'
import VenomClientAdapter from './adapters/VenomClientAdapter'
import WhatsappClient from './infra/Whatsapp/Client'

async function startApp() {
  try {
    await Odm.connection(mongoURI)

    const venomClient = new VenomClientAdapter()

    const client = new WhatsappClient(venomClient)

    await client.initialize()
  } catch (error) {
    logger.error('Error to initialize App:', error)
  }
}

startApp()
