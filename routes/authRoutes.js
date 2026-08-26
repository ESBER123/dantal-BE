import { Router } from "express";

import { login, profile, register } from "../controllers/authController.js";

import validate from "../middleware/validate.js";
import { registerSchema } from "../validators/authSchema.js";
import auth from "../middleware/auth.js";

const authRouter = Router();

authRouter.post("/register", validate(registerSchema), register);

authRouter.post("/login", login);

authRouter.get("/profile/me", auth, profile);

export default authRouter;
