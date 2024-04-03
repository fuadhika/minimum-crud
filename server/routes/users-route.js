import express from "express";
import {
  getUserProfile,
  updateUser,
  deleteUser,
} from "../controllers/users-controller.js";

const router = express.Router();

router.get("/profile", getUserProfile);
router.patch("/update", updateUser);
router.delete("/delete", deleteUser);

export default router;
