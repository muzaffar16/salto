import React, { createContext, useState } from "react";

export const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
  const [paymentDone, setPaymentDone] = useState(false);

  return (
    <PaymentContext.Provider value={{ paymentDone, setPaymentDone }}>
      {children}
    </PaymentContext.Provider>
  );
};
