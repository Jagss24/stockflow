import { ConflictError } from "../errors/app-error.js";
import {
  createUser,
  findUserByEmail,
} from "../repositories/user.repository.js";
import { TRegisterBody } from "../schemas/auth.schema.js";

const registerUser = async (body: TRegisterBody) => {
  const { password, email, ...rest } = body;

  const isExistingEmail = findUserByEmail(email);
  if (isExistingEmail) {
    throw new ConflictError("Email id already exist");
  }

  //   const hashedPassword = await bcrypt.hash(password, 10); // will implement hashing later

  const newUser = { ...rest, email, password: password };
  const user = createUser(newUser);
  return user;
};

export { registerUser };
