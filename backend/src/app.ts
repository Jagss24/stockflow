import express from "express";
import router from "./routes/index.js";
import { errorMiddleware } from "./middlewares/error-middleware.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { env } from "./config/env.js";

const app = express();

app.set("query parser", "extended");
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: env.FRONTEND_ORIGIN, credentials: true }));

app.use("/api", router);
app.use(errorMiddleware);

export default app;
