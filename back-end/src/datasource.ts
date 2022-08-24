

import { DataSource } from "typeorm"
let options:any;
if (process.env.TEST == 'false'){
    options = {
    type: "postgres",
    url: process.env.DATABASE_URL,
    entities: ["src/entities/*.ts"],
    logging: true,
    synchronize: false,
    ssl: true,
    extra: {
        ssl: {
            rejectUnauthorized: false
        }
    }
  }
} else {
    options = {
    type: "postgres",
    url: process.env.HEROKU_POSTGRESQL_CRIMSON_URL,
    entities: ["src/entities/*.ts"],
    logging: true,
    synchronize: true,
    dropSchema: true,
    ssl: true,
    extra: {
        ssl: {
            rejectUnauthorized: false
        }
    }
  }
}
export const GymKingDataSource = new DataSource(options)
