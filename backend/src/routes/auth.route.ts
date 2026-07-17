import { Router } from "express";
import { register } from "../controllers/auth.controller.js";
import { validateRequest } from "../middlewares/validate-request.middleware.js";
import { registerSchema } from "../schemas/auth.schema.js";

const authRouter = Router();

authRouter.post("/register", validateRequest(registerSchema), register);

export default authRouter;
