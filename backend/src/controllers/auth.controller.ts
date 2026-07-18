import { TRegisterBody } from "../schemas/auth.schema.js";
import { registerUser } from "../services/auth.service.js";
import { asyncHandler } from "../utils/async-handler.js";

const register = asyncHandler<TRegisterBody>(async (req, res) => {
  const { user, token } = await registerUser(req.body);

  return res
    .status(201)
    .cookie("accessToken", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    })
    .json({ data: user, success: true });
});

export { register };
