import mongoose, { ConnectOptions, Model, Schema } from "mongoose";
import { IOdm } from "./interfaces/odm";
import { logger } from "../infra/logger/logger";

class mongooseAdapter implements IOdm {
  async connection(uri: string, options?: ConnectOptions): Promise<void> {
    try {
      await mongoose.connect(uri, options);
      logger.info("Connected to MongoDB");
    } catch (error) {
      logger.error(error);
    }
  }

  schema<Schema = typeof Schema>(args: mongoose.DefaultSchemaOptions): Schema {
    return new mongoose.Schema(args) as Schema;
  }
  model(name: string, schema?: mongoose.Schema): typeof Model {
   
    return mongoose.model(name, schema);
  }
}
export { Schema, Model };
export default mongooseAdapter;
