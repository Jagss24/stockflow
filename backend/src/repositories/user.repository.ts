import users, { IUser } from "../data/users.js";

const createUser = (data: Omit<IUser, "id">) => {
  const newId = users.length + 1;
  const newUser = { ...data, id: newId };
  users.push(newUser);
  const { password, ...safeUser } = newUser;
  return safeUser;
};

const findUserByEmail = (email: string) => {
  const existingEmail = users.find((u) => {
    return u.email === email;
  });

  return existingEmail ?? null;
};

export { createUser, findUserByEmail };
