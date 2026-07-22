import { TSafeUser } from "./user.type.js";

declare module "express" {
  interface Request {
    user?: TSafeUser;
  }
}
