import api from "./api";

export const AuthService = {
  register(userData) {
    return api.post(
      "/auth/register",
      userData
    );
  },

  login(credentials) {
    return api.post(
      "/auth/login",
      credentials
    );
  },

  me() {
    return api.get("/auth/me");
  }
};