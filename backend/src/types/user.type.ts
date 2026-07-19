import { User } from "../generated/prisma/client.js";

type TSafeUser = Omit<User, "password">;
type TCreateUserData = Pick<User, "name" | "password" | "email">;

export { User as TUser, TSafeUser, TCreateUserData };
