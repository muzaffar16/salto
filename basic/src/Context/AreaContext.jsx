// In AreaContext.jsx
import React, { createContext, useState, useContext } from "react";

const AreaContext = createContext();

export const AreaProvider = ({ children }) => {
  const [deliveryMode, setDeliveryMode] = useState("Delivery");
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedOutlet, setSelectedOutlet] = useState("");

  return (
    <AreaContext.Provider
      value={{
        deliveryMode,
        setDeliveryMode,
        selectedArea,
        setSelectedArea,
        selectedOutlet,
        setSelectedOutlet,
      }}
    >
      {children}
    </AreaContext.Provider>
  );
};

export const useAreaContext = () => useContext(AreaContext);
