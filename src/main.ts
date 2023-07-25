import dotenv from 'dotenv'
dotenv.config()
import './infra/http/express'

import { logger } from './infra/logger/logger'

import mongoURI from './infra/database/mongoDB'
import Odm from './infra/odm/odm'
import VenomClientAdapter from './adapters/VenomClientAdapter'
import WhatsappClient from './infra/Whatsapp/Client'
import { CommandsUseCase } from './core/usecases/commands'
import { Sender } from './infra/Whatsapp/Sender'

async function startApp() {
  try {
    await Odm.connection(mongoURI)

    const venomClient = new VenomClientAdapter()

    const sender = new Sender(venomClient)
    const commands = new CommandsUseCase(sender)
    const client = new WhatsappClient(venomClient, commands)

    await client.initialize()
  } catch (error) {
    logger.error('Error to initialize App:', error)
  }
}

startApp()
