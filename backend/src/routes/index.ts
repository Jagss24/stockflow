import { Router } from "express";
import healthRouter from "./health.route.js";
import authRouter from "./auth.route.js";
import { authMiddleware } from "../middlewares/auth-middleware.js";
import userRouter from "./user.route.js";
import warehouseRouter from "./warehouse.route.js";

const router = Router();

router.use("/health", healthRouter);
router.use("/auth", authRouter);
router.use(authMiddleware);
router.use("/user", userRouter);
router.use("/warehouses", warehouseRouter);

export default router;
