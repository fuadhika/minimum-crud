import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth-route.js";
import usersRoutes from "./routes/users-route.js";
import authMiddleware from "./middleware/auth-middleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", authMiddleware, usersRoutes);

app.get("/api/v1/testing", (req, res) => {
  res.json({ message: "Testing route" });
});

const startServer = () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();
