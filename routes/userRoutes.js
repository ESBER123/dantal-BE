import express from "express";
import { getAllUsers, getUserById } from "../controllers/userController.js";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";

const router = express.Router();

router.get("/", auth, admin, getAllUsers);
router.get("/:id", auth, admin, getUserById);

export default router;
