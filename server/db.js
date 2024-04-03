import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

export const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});
