import { prisma } from "../lib/prisma.js";
import { TCreateUserData, TSafeUser, TUser } from "../types/user.type.js";

const createUser = async (data: TCreateUserData) => {
  const newUser = await prisma.user.create({
    data: { name: data.name, email: data.email, password: data.password },
  });

  return newUser;
};

const findUserByEmail = async (email: string) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: email },
  });

  return existingUser;
};

export { createUser, findUserByEmail };
