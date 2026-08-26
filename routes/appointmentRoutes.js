import express from "express";

import {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
} from "../controllers/appointmentController.js";
import validate from "../middleware/validate.js";
import { appointmentSchema } from "../validators/appointmentValidator.js";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";

const router = express.Router();

router.get("/", getAllAppointments);
router.get("/:id", getAppointmentById);
router.post("/", auth, validate(appointmentSchema), createAppointment);
router.put("/:id", auth, admin, validate(appointmentSchema), updateAppointment);
router.delete("/:id", auth, admin, deleteAppointment);
export default router;
