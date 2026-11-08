"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import api from "@/lib/axios";

const AuthContext = createContext({
  user: null,
  loading: true,
  login: async () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let token = null;
    try {
      token = localStorage.getItem("token");
    } catch (err) {}

    if (!token) {
      setLoading(false);
      return;
    }

    api
      .get("/auth/me")
      .then((res) => setUser(res.data.data))
      .catch(() => {
        try {
          localStorage.removeItem("token");
        } catch (e) {}
      })
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    const data = res.data.data;
    try {
      localStorage.setItem("token", data.token);
    } catch (err) {}
    setUser(data);
    return data;
  }, []);

  const logout = useCallback(() => {
    try {
      localStorage.removeItem("token");
    } catch (err) {}
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
