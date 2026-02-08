import { Dialect, Sequelize } from "sequelize";
import { SequelizeOptions } from "../plugins/sequelize";

let {
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  DB_PORT,
  DB_HOST,
  DB_DIALECT,
} = process.env;

interface ExtendedSequelizeOptions extends SequelizeOptions {
  dialectOptions?: {
    ssl?: {
      require: boolean;
      rejectUnauthorized: boolean;
    };
  };
}

let dbOptions: ExtendedSequelizeOptions = {
  database: DB_NAME!,
  username: DB_USERNAME!,
  password: DB_PASSWORD!,
  port: Number(DB_PORT!),
  host: DB_HOST!,
  dialect: DB_DIALECT!,
};

let sequelizeQuery = new Sequelize(
  dbOptions.database,
  dbOptions.username,
  dbOptions.password,
  {
    logging: false,
    host: dbOptions.host,
    dialect: dbOptions.dialect as Dialect,
    port: dbOptions.port,
  }
);

export const getSequelizeConnection = (config?: any): Sequelize => {
  if (config) {
    dbOptions = {
      database: config?.DB_NAME!,
      username: config?.DB_USERNAME!,
      password: config?.DB_PASSWORD!,
      port: Number(config?.DB_PORT!),
      host: config?.DB_HOST!,
      dialect: config?.DB_DIALECT!,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false, // Allow self-signed certificates if needed
        },
      },
    };
  }
  return sequelizeQuery;
};

export { sequelizeQuery };
