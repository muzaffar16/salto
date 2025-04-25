import React, { useContext, useState, useEffect } from "react";
import { PaymentContext } from "../../Context/PaymentContext";
import Layout from "../../components/layouts/layout";
import "../../styles/myOrder.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

function MyOrder() {
  const { paymentDone } = useContext(PaymentContext);
  const [orders, setOrders] = useState([]);
  const location = useLocation();
  const { formData } = location.state || {};

  // console.log("Form Data in MyOrder:", formData);  // Log formData to check if it is received
  // console.log("Payment done:", paymentDone);

  const customerEmail = "formData?.email"; // Get email from formData

  const fetchAllOrder = async () => {
    if (!customerEmail) {
      toast.error("Customer email is missing.");
      // return;
    }
    localStorage.setItem("orders", JSON.stringify(ordersArray));

    setOrders(ordersArray); // Set the orders to state
    try {
      const response = await axios.post(`http://localhost:3000/api/orders/myOrder`, {
        customeremail: customerEmail
      });

      // Log the full response data to inspect it
      // console.log("API Response:", response.data);

      // Check if the response has the 'success' flag and orders data
      if (response.data?.success && response.data?.data) {
        const orderData = response.data.data;

        // If orderData is a single object, wrap it in an array
        const ordersArray = Array.isArray(orderData) ? orderData : [orderData];
        // console.log("Fetched Orders:", ordersArray);

        // Save the orders to localStorage
        // localStorage.setItem("orders", JSON.stringify(ordersArray));

        // setOrders(ordersArray); // Set the orders to state
        toast.success("Your Order(s) fetched successfully");
      } else {
        toast.error("No orders found");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders");
    }
  };

  useEffect(() => {
    // Check if orders exist in localStorage
    const savedOrders = localStorage.getItem("orders");
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders)); // Load orders from localStorage
      fetchAllOrder();
    }

    if (paymentDone && customerEmail && !savedOrders) {
      console.log("Fetching orders...");
      fetchAllOrder();
    }
  }, [paymentDone, customerEmail]);

  useEffect(() => {
    console.log("Orders:", orders); // Log orders here to check the data
    console.log("Order Length:", orders.length);
  }, [orders]);

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

                  {/* Display order status */}
                  <p>Order Status: {order.orderstatus}</p>
                  {/* Conditionally render status-specific messages */}
                  {order.orderstatus === "Delivered" ? (
                    <p>Your order is delivered.</p>
                  ) : order.orderstatus === "Canceled" ? (
                    <p>Your order has been canceled.</p>
                  ) : (
                    <p>Order is still being processed.</p>
                  )}

                  <h5>Items:</h5>
                  <ul>
                    {order.order_items.map((item, idx) => (
                      <li key={idx}>
                        {item.productname} (Qty: {item.quantity}, Price: Rs. {item.price})
                      </li>
                    ))}
                  </ul>

                </div>
              ))}
              <div class="instruction-container">
                <p class="instruction-title">Instructions:</p>
                <p class="instruction-text">Please Take A screen Shot of your Order</p>
                <p class="instruction-text">Please don't reload or switch your tab</p>
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
