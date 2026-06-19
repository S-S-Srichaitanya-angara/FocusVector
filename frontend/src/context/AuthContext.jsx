import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import { AuthService }
  from "../services/auth.service";

const AuthContext =
  createContext();

export function AuthProvider({
  children
}) {
  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const token =
        localStorage.getItem(
          "token"
        );

      if (!token) {
        setLoading(false);
        return;
      }

      const response =
        await AuthService.me();

      setUser(
        response.data.data
      );
    } catch {
      localStorage.removeItem(
        "token"
      );
    }

    setLoading(false);
  }

  async function login(
    email,
    password
  ) {
    const response =
      await AuthService.login({
        email,
        password
      });

    const token =
      response.data.data.token;

    localStorage.setItem(
      "token",
      token
    );

    await checkAuth();
  }

  function logout() {
    localStorage.removeItem(
      "token"
    );

    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(
    AuthContext
  );
}