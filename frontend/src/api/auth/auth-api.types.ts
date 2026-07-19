type LoginRequest = {
  email: string;
  password: string;
};

type AuthUser = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

type LoginResponse = {
  data: AuthUser;
  success: boolean;
};

export type { AuthUser, LoginRequest, LoginResponse };
