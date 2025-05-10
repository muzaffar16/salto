import React, { useContext, useState, useEffect } from "react";
import { PaymentContext } from "../../Context/PaymentContext";
import Layout from "../../components/layouts/layout";
import "@/styles/myOrder.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

function MyOrder() {
  const { paymentDone } = useContext(PaymentContext);
  const [orders, setOrders] = useState([]);
  const location = useLocation();
  const { formData } = location.state || {};

  const customerEmail = formData?.email || localStorage.getItem("userEmail") || "";

  useEffect(() => {
    if (formData?.email) {
      localStorage.setItem("userEmail", formData.email);
    }
  }, [formData]);

  const fetchAllOrder = async () => {
    if (!customerEmail) {
      toast.error("Customer email is missing.");
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_backend_url}/api/orders/myOrder`, {
        useremail: customerEmail,
      });

      console.log("API Response:", response.data);

      if (response.data?.success && Array.isArray(response.data.data) && response.data.data.length > 0) {
        setOrders(response.data.data);
        toast.success("Your Order(s) fetched successfully");
      } else {
        setOrders([]);
        toast.error("No orders found");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders");
    }
  };

  useEffect(() => {
    if (customerEmail) {
      fetchAllOrder();
    }
  }, [customerEmail, paymentDone]);

  return (
    <Layout>
      <div className="mainBox"></div>
      <div className="order add">
        <h3>My Orders</h3>
        {customerEmail ? (
          orders.length > 0 ? (
            <div className="order-list">
              {orders.map((order, index) => (
                <div className="order-item" key={index}>
                  <h4>Order ID: {order.orderid}</h4>
                  <p>Order Date: {new Date(order.orderdate).toLocaleDateString()}</p>
                  <p>Total Amount: Rs. {order.totalamount}</p>
                  <p>Order Status: {order.orderstatus}</p>
                  <p>
                    {order.orderstatus === "Delivered"
                      ? "Your order is delivered."
                      : order.orderstatus === "Canceled"
                      ? "Your order has been canceled."
                      : "Order is still being processed."}
                  </p>

                  <h5>Items:</h5>
                  <ul>
                    {order.order_items?.map((item, idx) => (
                      <li key={idx}>
                        {item.productname} (Qty: {item.quantity}, Price: Rs. {item.price})
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="instruction-container">
                <p className="instruction-title">Instructions:</p>
                <p className="instruction-text">Please take a screenshot of your order</p>
                <p className="instruction-text">Please don't reload or switch your tab</p>
              </div>
            </div>
          ) : (
            <p>No orders available</p>
          )
        ) : (
          <div className="empty">
            <div className="h">
              <h1>You don't have any orders yet.</h1>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default MyOrder;
