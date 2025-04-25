import React, { useState, useEffect } from 'react';
import orderContext from './OrderContext';

const OrderState = (props) => {
  const [order, setOrder] = useState([]);

  // Fetch the order from localStorage on initial load
  useEffect(() => {
    const savedOrder = JSON.parse(localStorage.getItem('order'));
    if (savedOrder) {
      setOrder(savedOrder);
    }
  }, []);

  // Save the order to localStorage whenever it changes
  useEffect(() => {
    if (order.length > 0) {
      localStorage.setItem('order', JSON.stringify(order));
    } else {
      localStorage.removeItem('order');
    }
  }, [order]);

  const addToOrder = (item) => {
    setOrder((prevOrder) => {
      const itemIndex = prevOrder.findIndex((orderItem) => orderItem.title === item.title);

      if (itemIndex > -1) {
        const updatedOrder = [...prevOrder];
        updatedOrder[itemIndex].quantity += 1;
        return updatedOrder;
      } else {
        return [...prevOrder, { ...item, quantity: 1 }];
      }
    });
  };

  const incrementQuantity = (title) => {
    setOrder((prevOrder) =>
      prevOrder.map((item) =>
        item.title === title ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (title) => {
    setOrder((prevOrder) =>
      prevOrder
        .map((item) =>
          item.title === title ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0) // Remove items with quantity 0
    );
  };

  return (
    <orderContext.Provider value={{ order, addToOrder, incrementQuantity, decrementQuantity }}>
      {props.children}
    </orderContext.Provider>
  );
};

export default OrderState;
