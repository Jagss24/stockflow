import { ConflictError } from "../errors/app-error.js";
import {
  createUser,
  findUserByEmail,
} from "../repositories/user.repository.js";
import { TRegisterBody } from "../schemas/auth.schema.js";
import bcrypt from "bcrypt";
import { signToken } from "../utils/jwt.js";

const registerUser = async (body: TRegisterBody) => {
  const { password, email, ...rest } = body;

  const isExistingEmail = findUserByEmail(email);
  if (isExistingEmail) {
    throw new ConflictError("Email id already exist");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = { ...rest, email, password: hashedPassword };
  const user = createUser(newUser);

  const token = signToken(user, "3d");
  return { user, token };
};

export { registerUser };
