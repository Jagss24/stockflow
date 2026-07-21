import { prisma } from "../lib/prisma.js";
import { TCreateUserData } from "../types/user.type.js";

const createUser = async (data: TCreateUserData) => {
  const user = await prisma.user.create({
    data: { name: data.name, email: data.email, password: data.password },
  });

  return user;
};

const findUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  return user;
};

const findUserById = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  return user;
};

export { createUser, findUserByEmail, findUserById };
