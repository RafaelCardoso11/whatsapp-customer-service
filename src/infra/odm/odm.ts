import { Schema, SchemaDefinition, ConnectOptions, Model } from 'mongoose';
import { IOdm } from '../../adapters/interfaces/odm';
import mongooseAdapter from '../../adapters/MongooseAdapter';

class Odm<TSchema> implements IOdm<Schema, Model<any>> {
  private odm: IOdm<Schema, Model<any>>;
  Schema: TSchema;
  constructor(Odm: IOdm<Schema, Model<any>>, schema: TSchema) {
    this.odm = Odm;
    this.Schema = schema;
  }
  async connection<Options extends ConnectOptions>(uri: string, options?: Options): Promise<void> {
    try {
      await this.odm.connection(uri, options);
    } catch (error) {
      throw new Error('error creating connection' + error);
    }
  }
  async disconnect(): Promise<void> {
    await this.disconnect();
  }
  createSchema<SchemaType extends SchemaDefinition, SchemaReturn = typeof Schema>(args: SchemaType): SchemaReturn {
    return this.odm.createSchema(args);
  }
  createModel<SchemaType extends Schema>(name: string, schema?: any): Model<SchemaType | any> {
    return this.odm.createModel(name, schema);
  }
}

export default new Odm<typeof Schema>(new mongooseAdapter(), Schema);
