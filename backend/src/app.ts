import express from "express";
import router from "./routes/index.js";

const app = express();

app.use(express.json());

app.use("/api", router);

app.use("/", (req, res) => {
  res.send("Hello human1");
});

export default app;
