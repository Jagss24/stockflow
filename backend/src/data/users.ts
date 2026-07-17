export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
}
const users: IUser[] = [
  { id: 1, name: "Jagss", email: "jagss@gmail.com", password: "!23s" },
];

export default users;
