import { ConflictError, UnauthorizedError } from "../errors/app-error.js";
import {
  createUser,
  findUserByEmail,
} from "../repositories/user.repository.js";
import { TLoginBody, TRegisterBody } from "../schemas/auth.schema.js";
import bcrypt from "bcrypt";
import { signToken } from "../utils/jwt.js";
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
  const token = signToken(safeUser, "3d");
  return { user: safeUser, token };
};

const loginUser = async (body: TLoginBody) => {
  const { email, password } = body;
  const exisitingUser = await findUserByEmail(email);
  if (!exisitingUser) {
    throw new UnauthorizedError("Invalid credentials");
  }

  const passwordMatched = await bcrypt.compare(
    password,
    exisitingUser.password,
  );

  if (!passwordMatched) {
    throw new UnauthorizedError("Invalid credentials");
  }

  const safeUser = toSafeUser(exisitingUser);
  const token = signToken(safeUser, "3d");
  return { user: safeUser, token };
};
export { registerUser, loginUser };
