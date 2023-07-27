import dotenv from 'dotenv'
dotenv.config()
import './infra/http/express'

import { logger } from './infra/logger/logger'

import mongoURI from './infra/database/mongoDB'
import Odm from './infra/odm/odm'
import { WhatsappClientFactory } from './infra/whatsapp/ClientFactory'

async function startApp() {
  try {
    await Odm.connection(mongoURI)

    const client = WhatsappClientFactory.create()

    await client.initialize()
  } catch (error) {
    logger.error('Error to initialize App:', error)
  }
}

startApp()
