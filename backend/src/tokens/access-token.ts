import { JwtPayload } from "jsonwebtoken";
import { UnauthorizedError } from "../errors/app-error.js";
import { signJwt, verifyJwt } from "../lib/jwt.js";

type TAccessTokenPayload = Omit<JwtPayload, "sub"> & {
  type: "access";
  sub: number;
};

type TSignAccessTokenPayload = {
  sub: number;
};

const isAccessTokenPayload = (
  payload: unknown,
): payload is TAccessTokenPayload => {
  if (typeof payload !== "object" || payload === null) {
    return false;
  }

  const tokenPayload = payload as Record<string, unknown>;

  return (
    tokenPayload.type === "access" &&
    typeof tokenPayload.sub === "number"
  );
};

const signAccessToken = (payload: TSignAccessTokenPayload) => {
  return signJwt({ ...payload, type: "access" }, "3d");
};

const verifyAccessToken = (token: string) => {
  const payload = verifyJwt(token);

  if (!isAccessTokenPayload(payload)) {
    throw new UnauthorizedError("Invalid token");
  }

  return payload;
};

export { signAccessToken, verifyAccessToken };
export type { TAccessTokenPayload };
