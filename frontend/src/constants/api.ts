export const API_ENDPOINTS = {
  auth: {
    login: "/auth/login",
    logout: "/auth/logout",
  },
  user: {
    me: "/user/me",
  },
} as const;
