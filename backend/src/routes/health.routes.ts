import { Router } from "express";

const healthRouter = Router();

healthRouter.get("/health", (req, res) => {
  res.send("Hello yess");
});

export default healthRouter;
