import { Request } from "express";
import { UnauthorizedError } from "../errors/app-error.js";

const requireAuthUser = (req: Request) => {
  if (!req.user) {
    throw new UnauthorizedError("Authentication required");
  }

  return req.user;
};

export { requireAuthUser };
