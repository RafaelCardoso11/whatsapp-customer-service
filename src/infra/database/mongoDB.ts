const config = {
  username: process.env.MONGODB_USERNAME,
  password: String(process.env.MONGODB_PASSWORD),
  host: process.env.MONGODB_HOST,
  port: process.env.MONGODB_PORT,
  database: process.env.MONGODB_DATABASE,
};

const mongoURI = `mongodb://${config.host}:${config.port}/${config.database}`;

export default mongoURI;
