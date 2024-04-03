import { connection } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, birthday, email, password } = req.body;

    if (!name || !birthday || !email || !password) {
      throw new Error("Missing required information");
    }

    const [user] = await connection.query(
      "SELECT * FROM users WHERE email = ?",
      email
    );

    if (user.length > 0) {
      throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await connection.query(
      "INSERT INTO users (name, birthday, email, password) VALUES (?, ?, ?, ?)",
      [name, birthday, email, hashedPassword]
    );

    res.status(201).json({ message: "User registered" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [user] = await connection.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (user.length === 0) {
      throw new Error("Invalid credentials");
    }

    const isValidPassword = await bcrypt.compare(password, user[0].password);

    if (!isValidPassword) {
      throw new Error("Invalid credentials");
    }

    const { password: userPassword, ...userInfo } = user[0];
    const token = jwt.sign({ ...userInfo }, process.env.JWT_SECRET);

    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ message: "User logged in", data: userInfo });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token").status(200).json({ message: "User logged out" });
  } catch (error) {
    res.json({ message: error.message });
  }
};
