import { createContext, useState } from "react";

// Create the Context
export const TokenContext = createContext();

// Create the Provider
export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
};
