import express from "express";
import {
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
} from "../controllers/doctorController.js";
import validate from "../middleware/validate.js";
import { doctorSchema } from "../validators/doctorValidator.js";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";
import upload from "../middleware/upload.js";
const router = express.Router();

router.post(
  "/",
  auth,
  admin,
  upload.single("image"),
  validate(doctorSchema),
  createDoctor,
);
router.get("/", getAllDoctors);
router.get("/:id", getDoctorById);
router.put(
  "/:id",
  auth,
  admin,
  upload.single("image"),
  validate(doctorSchema),
  updateDoctor,
);
router.delete("/:id", auth, admin, deleteDoctor);

export default router;
