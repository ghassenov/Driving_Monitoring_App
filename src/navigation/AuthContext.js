import React, { createContext, useEffect, useState } from "react";
import { login as apiLogin, register as apiRegister } from "../services/authService";
import userService from "../services/userService"; 
import { storeToken, getToken, removeToken } from "../utils/storage";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function bootstrap() {
      const token = await getToken();
      if (token) {
        try {
          const userData = await userService.getProfile(token);
          setUser({ 
            ...userData,
            token 
          });
        } catch (error) {
          console.log("Failed to fetch user profile:", error);
          setUser({ token });
        }
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
        const token = res.data.access_token;
        await storeToken(token);
        
        const userData = await userService.getProfile(token);
        setUser({ 
          ...userData,
          token 
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
        const token = res.data.access_token;
        await storeToken(token);
        
        const userData = await userService.getProfile(token);
        setUser({ 
          ...userData,
          token 
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

  const updateUserProfile = async (updates) => {
    try {
      const updatedUser = await userService.updateProfile(updates, user.token);
      setUser(prevUser => ({
        ...prevUser,
        ...updatedUser
      }));
      return true;
    } catch (error) {
      console.log("Update profile error:", error);
      return false;
    }
  };

  const getDisplayName = () => {
    return user?.full_name || user?.email || "User";
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      loading,
      updateUserProfile, 
      getDisplayName
    }}>
      {children}
    </AuthContext.Provider>
  );
}