import jwt, { SignOptions } from "jsonwebtoken";
import { env } from "../config/env.js";

const signJwt = (
  payload: object,
  expiresIn: SignOptions["expiresIn"] = "1d",
) => {
  return jwt.sign(payload, env.JWT_SECRET_KEY, {
    expiresIn,
  });
};

const verifyJwt = (token: string) => {
  return jwt.verify(token, env.JWT_SECRET_KEY);
};

export { signJwt, verifyJwt };
