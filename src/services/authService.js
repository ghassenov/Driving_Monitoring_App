import api from "./api";

export const register = (fullname, email, password) =>
  api.post("/auth/signup", { 
    full_name: fullname,  
    email: email, 
    password: password 
  });

export const login = (email, password) =>
  api.post("/auth/login", { email:email, password:password });