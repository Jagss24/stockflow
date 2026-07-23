import { TLoginBody, TRegisterBody } from "../schemas/auth.schema.js";
import { loginUser, registerUser } from "../services/auth.service.js";
import { asyncHandler } from "../utils/async-handler.js";

const register = asyncHandler<TRegisterBody>(async (req, res) => {
  const { user, token } = await registerUser(req.body);

  return res
    .status(201)
    .cookie("accessToken", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 3,
    })
    .json({ data: user, success: true });
});

const login = asyncHandler<TLoginBody>(async (req, res) => {
  const { user, token } = await loginUser(req.body);
  return res
    .status(200)
    .cookie("accessToken", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 3,
    })
    .json({ data: user, success: true });
});

const logout = asyncHandler(async (_req, res) => {
  return res.status(200).clearCookie("accessToken").json({ success: true });
});

export { register, login, logout };
