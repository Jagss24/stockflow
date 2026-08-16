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
    stats: "/categories/stats",
    single: (id: string) => `/categories/${id}`,
  },
  warehouses: {
    list: "/warehouses",
    stats: "/warehouses/stats",
    single: (id: string) => `/warehouses/${id}`,
  },
} as const;
