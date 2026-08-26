import express from "express";
import {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
} from "../controllers/serviceController.js";
import validate from "../middleware/validate.js";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";

import { serviceSchema } from "../validators/serviceValidator.js";
const router = express.Router();

router.get("/", getAllServices);
router.get("/:id", getServiceById);
router.post("/", auth, admin, validate(serviceSchema), createService);
router.put("/:id", auth, admin, validate(serviceSchema), updateService);
router.delete("/:id", auth, admin, deleteService);

export default router;
