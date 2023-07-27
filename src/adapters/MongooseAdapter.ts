import mongoose, { ConnectOptions, InferSchemaType, Model, Schema, SchemaDefinition } from 'mongoose';
import { IOdm } from './interfaces/odm';
import { logger } from '../infra/logger/logger';

class mongooseAdapter implements IOdm<Schema, Model<any>> {
  async connection<Options extends ConnectOptions>(uri: string, options?: Options): Promise<void> {
    try {
      await mongoose.connect(uri, options);
      logger.info('Connected to MongoDB');
    } catch (error) {
      logger.error('Connection MongoDB Error');
    }
  }
  async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect();
    } catch (error) {
      logger.error(error);
    }
  }
  createSchema<args extends SchemaDefinition, SchemaReturn = typeof Schema>(schemaDefinition: args): SchemaReturn {
    return new mongoose.Schema(schemaDefinition) as SchemaReturn;
  }

  createModel<SchemaType extends Schema>(modelName: string, schema: SchemaType): Model<InferSchemaType<SchemaType>> {
    return mongoose.model(modelName, schema);
  }
}

export default mongooseAdapter;
