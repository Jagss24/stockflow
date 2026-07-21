import { asyncHandler } from "../utils/async-handler.js";
import { userInfo } from "../services/user.service.js";
import { requireAuthUser } from "../utils/require-auth-user.js";

const getCurrentUser = asyncHandler(async (req, res) => {
  const authUser = requireAuthUser(req);
  const user = await userInfo(authUser.id);
  return res.status(200).json({ data: user, success: true });
});

export { getCurrentUser };
