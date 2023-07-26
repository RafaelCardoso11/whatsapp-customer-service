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
import { ConsultantRepository } from './infra/repositories/Consultant'
import { QueueAttendimentRepository } from './infra/repositories/QueueAttendiment'
import { QueueAttendimentUseCase } from './core/usecases/QueueAttendiment'
import { ConsultantUseCase } from './core/usecases/Consultant'

async function startApp() {
  try {
    await Odm.connection(mongoURI)

    const venomClient = new VenomClientAdapter()

    const sender = new Sender(venomClient)

    const consultantRepository = new ConsultantRepository()
    const queueAttendimentRepository = new QueueAttendimentRepository()

    const commandsUseCase = new CommandsUseCase(sender)
    const queueAttendimentUseCase = new QueueAttendimentUseCase(queueAttendimentRepository)
    const consultantUseCase = new ConsultantUseCase(consultantRepository)

    const client = new WhatsappClient(venomClient, sender, queueAttendimentUseCase, commandsUseCase, consultantUseCase)

    await client.initialize()
  } catch (error) {
    logger.error('Error to initialize App:', error)
  }
}

startApp()
