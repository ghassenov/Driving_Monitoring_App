import React, { createContext, useEffect, useState } from "react";
import { login as apiLogin, register as apiRegister } from "../services/authService";
import { storeToken, getToken, removeToken } from "../utils/storage";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function bootstrap() {
      const token = await getToken();
      if (token) {
        setUser({ token });
      }
      setLoading(false);
    }
    bootstrap();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await apiLogin(email, password);
      console.log("Login response:", res.data);
      
      if (res?.data?.access_token) {
        await storeToken(res.data.access_token);
        setUser({ 
          email, 
          token: res.data.access_token,
          id: res.data.user?.id 
        });
        return true;
      }
      return false;
    } catch (error) {
      console.log("Login error:", error);
      return false;
    }
  };

  const register = async (fullname, email, password) => {
    try {
      const res = await apiRegister(fullname, email, password);
      console.log("Register response:", res.data);
      
      if (res?.data?.access_token) {
        await storeToken(res.data.access_token);
        setUser({ 
          email, 
          token: res.data.access_token,
          id: res.data.user?.id 
        });
        return true;
      }
      return false;
    } catch (error) {
      console.log("Register error:", error);
      return false;
    }
  };

  const logout = async () => {
    await removeToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}