import { TRegisterBody } from "../schemas/auth.schema.js";
import { registerUser } from "../services/auth.service.js";
import { asyncHandler } from "../utils/async-handler.js";

const register = asyncHandler<TRegisterBody>(async (req, res) => {
  const user = await registerUser(req.body);

  return res.status(201).json({ data: user, success: true });
});

export { register };
