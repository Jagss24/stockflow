import { Router } from "express";

const healthRouter = Router();

healthRouter.get("/", (_, res) => {
  res.send("Hello human");
});

export default healthRouter;
