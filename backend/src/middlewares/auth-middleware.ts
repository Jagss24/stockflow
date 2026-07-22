import { asyncHandler } from "../utils/async-handler.js";
import { UnauthorizedError } from "../errors/app-error.js";
import { verifyAccessToken } from "../tokens/access-token.js";
import { findUserById } from "../repositories/user.repository.js";
import { toSafeUser } from "../mapper/user.mapper.js";

const authMiddleware = asyncHandler(async (req, _res, next) => {
  const token = req.cookies?.accessToken;
  if (!token) throw new UnauthorizedError("No token found");

  const decoded = verifyAccessToken(token);
  const user = await findUserById(decoded.sub);

  if (!user) {
    throw new UnauthorizedError("Invalid token");
  }

  req.user = toSafeUser(user);
  next();
});

export { authMiddleware };
