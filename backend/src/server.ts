import http from "http";
import app from "./app.js";
import { env } from "./config/env.js";

const server = http.createServer(app);
const PORT = env.PORT;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
