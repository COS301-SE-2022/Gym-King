import { DataSource } from "typeorm"
export const GymKingDataSource = new DataSource({
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
})
