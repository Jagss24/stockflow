import { asyncHandler } from "../utils/async-handler.js";
import { requireAuthUser } from "../utils/require-auth-user.js";

const getCurrentUser = asyncHandler(async (req, res) => {
  const user = requireAuthUser(req);
  return res.status(200).json({ data: user, success: true });
});

export { getCurrentUser };
