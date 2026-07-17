import { Router } from "express";

const healthRouter = Router();

healthRouter.get("/", (req, res) => {
  res.send("Hello human");
});

export default healthRouter;
