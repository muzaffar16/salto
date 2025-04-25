import React, { createContext, useContext, useState } from "react";

const OrderTypeContext = createContext();

export const OrderTypeProvider = ({ children }) => {
  const [orderType, setOrderType] = useState("");

  return (
    <OrderTypeContext.Provider value={{ orderType, setOrderType }}>
      {children} {/* This is important */}
    </OrderTypeContext.Provider>
  );
};

export const useOrderTypeContext = () => {
  return useContext(OrderTypeContext);
};
