export const API_ENDPOINTS = {
  auth: {
    login: "/auth/login",
    logout: "/auth/logout",
  },
  user: {
    me: "/user/me",
  },
  categories: {
    list: "/categories",
    single: (id: string) => `/categories/${id}`,
  },
} as const;
