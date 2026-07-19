import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";
import { validateRequest } from "../middlewares/validate-request.middleware.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";

const authRouter = Router();

authRouter.post("/register", validateRequest(registerSchema), register);
authRouter.post("/login", validateRequest(loginSchema), login);

export default authRouter;
