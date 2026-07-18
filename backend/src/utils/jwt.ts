import jwt, { SignOptions } from "jsonwebtoken";
import { IUser } from "../data/users.js";
import { env } from "../config/env.js";

const signToken = (
  payload: object,
  expiresIn: SignOptions["expiresIn"] = "1d",
) => {
  return jwt.sign(payload, env.JWT_SECRET_KEY, {
    expiresIn: expiresIn,
  });
};

const verifyToken = (token: string) => {
  return jwt.verify(token, env.JWT_SECRET_KEY) as Omit<IUser, "password">;
};

export { signToken, verifyToken };
