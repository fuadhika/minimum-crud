import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";

dotenv.config();

const users = [
  {
    name: "John Doe",
    birthday: "1990-01-01",
    email: "john.doe@gmail.com",
    password: "password",
  },
  {
    name: "Jane Smith",
    birthday: "1995-02-15",
    email: "jane.smith@gmail.com",
    password: "password",
  },
  {
    name: "Michael Johnson",
    birthday: "1988-07-10",
    email: "michael.johnson@gmail.com",
    password: "password",
  },
  {
    name: "Emily Davis",
    birthday: "1992-04-25",
    email: "emily.davis@gmail.com",
    password: "password",
  },
  {
    name: "David Wilson",
    birthday: "1991-09-18",
    email: "david.wilson@gmail.com",
    password: "password",
  },
];

const hashedUsers = await Promise.all(
  users.map(async (user) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.password, salt);
      return { ...user, password: hashedPassword };
    } catch (error) {
      console.error(error);
    }
  })
);

const seed = async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  try {
    await connection.execute(
      `CREATE SCHEMA IF NOT EXISTS ${process.env.DB_NAME}`
    );
    await connection.query(`USE ${process.env.DB_NAME}`);
    await connection.query(
      `CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(45) NOT NULL,
            birthday DATE NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`
    );
    await connection.query(
      "INSERT INTO users (name, birthday, email, password) VALUES ?",
      [hashedUsers.map((user) => Object.values(user))]
    );

    console.log("Seed successful!");
  } catch (error) {
    console.error(error);
  } finally {
    connection.end();
  }
};

seed();
