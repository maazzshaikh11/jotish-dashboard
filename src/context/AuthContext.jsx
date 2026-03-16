import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return localStorage.getItem("auth") === "true";
  });

  const login = (username, password) => {
    if (username === "testuser" && password === "Test123") {
      localStorage.setItem("auth", "true");
      setUser(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("auth");
    setUser(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);