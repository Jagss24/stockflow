import { ConflictError, UnauthorizedError } from "../errors/app-error.js";
import {
  createUser,
  findUserByEmail,
} from "../repositories/user.repository.js";
import { TLoginBody, TRegisterBody } from "../schemas/auth.schema.js";
import bcrypt from "bcrypt";
import { signAccessToken } from "../tokens/access-token.js";
import { toSafeUser } from "../mapper/user.mapper.js";

const registerUser = async (body: TRegisterBody) => {
  const { password, email, ...rest } = body;

  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new ConflictError("Email id already exist");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = { ...rest, email, password: hashedPassword };
  const user = await createUser(newUser);
  const safeUser = toSafeUser(user);
  const token = signAccessToken({ sub: safeUser.id });
  return { user: safeUser, token };
};

const loginUser = async (body: TLoginBody) => {
  const { email, password } = body;
  const existingUser = await findUserByEmail(email);
  if (!existingUser) {
    throw new UnauthorizedError("Invalid credentials");
  }

  const passwordMatched = await bcrypt.compare(password, existingUser.password);

  if (!passwordMatched) {
    throw new UnauthorizedError("Invalid credentials");
  }

  const safeUser = toSafeUser(existingUser);
  const token = signAccessToken({ sub: safeUser.id });
  return { user: safeUser, token };
};
export { registerUser, loginUser };
