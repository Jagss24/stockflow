import { TAuthenticatedUser } from "../middlewares/auth-middleware.js";

declare module "express" {
  interface Request {
    user?: TAuthenticatedUser;
  }
}
