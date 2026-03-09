import { Sequelize } from "sequelize";
if (!process.env.DB_NAME) throw new Error("DB_NAME missing");
if (!process.env.DB_USER) throw new Error("DB_USER missing");
if (!process.env.DB_PASSWORD) throw new Error("DB_PASSWORD missing");

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || "localhost", // ← fix here
    dialect: "mysql",
  },
);
