export interface IOdm<SchemaType, ModelType> {
  connection<Options extends Record<any, any>>(uri: string, options?: Options): Promise<void>;
  disconnect(): Promise<void>;
  createSchema<SchemaDefinition extends Record<any, any>, SchemaReturn>(
    schemaDefinition: SchemaDefinition
  ): SchemaReturn;
  createModel(modelName: string, schema: SchemaType): ModelType;
}
