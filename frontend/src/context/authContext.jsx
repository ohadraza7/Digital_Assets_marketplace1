import React, { createContext, useEffect, useState } from "react";
import * as authService from "../services/authService";
import { Route, useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Auto-login: check token and fetch profile
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const data = await authService.getProfile();
        setUser(data.user || data);
        localStorage.setItem("role", data.user.role); // restore role
      } catch (err) {
        console.warn("Auto-login failed", err);
        localStorage.removeItem("token");
        localStorage.removeItem("role");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // REGISTER
  const register = async (payload) => {
    setError(null);
    try {
      const data = await authService.register(payload);

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.user.role);
      }

      setUser(data.user);
      return data;
    } catch (err) {
      setError(err?.response?.data?.message || err.message);
      throw err;
    }
  };

  // LOGIN
  const login = async (email, password) => {
    setError(null);
    try {
      const data = await authService.login({ email, password });

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.user.role);
      }

      setUser(data.user);
      return data;
    } catch (err) {
      setError(err?.response?.data?.message || err.message);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, error, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
