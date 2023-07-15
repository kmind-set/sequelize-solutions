import { DataTypes, Sequelize } from "sequelize";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "../.env") });

export const sequelize = new Sequelize(process.env.DB_CONN as string, {
  dialect: "postgres",
});
