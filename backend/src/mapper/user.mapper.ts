import { TSafeUser, TUser } from "../types/user.type.js";

const toSafeUser = (user: TUser): TSafeUser => {
  const { password, ...safeUser } = user;
  return safeUser;
};

export { toSafeUser };
