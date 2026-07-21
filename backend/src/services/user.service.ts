import { NotFoundError } from "../errors/app-error.js";
import { toSafeUser } from "../mapper/user.mapper.js";
import { findUserById } from "../repositories/user.repository.js";

const userInfo = async (id: number) => {
  const user = await findUserById(id);
  if (!user) {
    throw new NotFoundError("User not found");
  }
  const safeUser = toSafeUser(user);
  return safeUser;
};

export { userInfo };
