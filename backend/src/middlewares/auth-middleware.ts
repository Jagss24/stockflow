import { asyncHandler } from "../utils/async-handler.js";
import { UnauthorizedError } from "../errors/app-error.js";
import { verifyAccessToken } from "../tokens/access-token.js";

type TAuthenticatedUser = {
  id: number;
};

const authMiddleware = asyncHandler(async (req, _res, next) => {
  const token = req.cookies?.accessToken;
  if (!token) throw new UnauthorizedError("No token found");

  const decoded = verifyAccessToken(token);

  req.user = { id: decoded.sub };
  next();
});

export { authMiddleware };
export type { TAuthenticatedUser };
