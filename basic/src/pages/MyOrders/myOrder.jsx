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

  // persist email
  useEffect(() => {
    if (formData?.email) {
      localStorage.setItem("userEmail", formData.email);
    }
  }, [formData]);

  const fetchAllOrders = async () => {
    if (!customerEmail) {
      toast.error("Customer email is missing.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_backend_url}/api/orders/myOrder`,
        { useremail: customerEmail }
      );

      // 1) What did the API return exactly?
      console.log("1) raw response.data.data:", response.data.data);

      // 2) Is it an array?
      console.log(
        "2) is array? length:",
        Array.isArray(response.data.data),
        response.data.data?.length
      );

      // 3) Normalize into an actual array of orders
      let ordersArray = [];
      if (Array.isArray(response.data.data)) {
        ordersArray = response.data.data;
      } else if (
        response.data.data &&
        typeof response.data.data === "object"
      ) {
        // sometimes Sequelize returns object with numeric keys
        ordersArray = Object.values(response.data.data);
      }

      console.log("3) normalized ordersArray:", ordersArray);

      if (ordersArray.length > 0) {
        setOrders(ordersArray);
        toast.success("Your order(s) fetched successfully.");
      } else {
        setOrders([]);
        toast.info("No orders found.");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders.");
    }
  };

  // refetch on mount or after payment
  useEffect(() => {
    if (customerEmail) {
      fetchAllOrders();
    }
  }, [customerEmail, paymentDone]);

  return (
    <Layout>
      <div className="order add">
        <h3>My Orders</h3>

        {!customerEmail ? (
          <div className="empty">
            <h1>You don't have any orders yet.</h1>
          </div>
        ) : orders.length === 0 ? (
          <p>No orders available.</p>
        ) : (
          <div className="order-list">
            {orders.map((order, i) => (
              <div className="order-item" key={i}>
                <h4>Order ID: {order.orderid}</h4>
                <p>
                  Order Date:{" "}
                  {new Date(order.orderdate).toLocaleDateString()}
                </p>
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
                {order.order_items?.length > 0 ? (
                  <ul>
                    {order.order_items.map((item, idx) => (
                      <li key={idx}>
                        {item.productname} (Qty: {item.quantity}, Price: Rs.{" "}
                        {item.price})
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No items in this order.</p>
                )}
              </div>
            ))}

            <div className="instruction-container">
              <p className="instruction-title">Instructions:</p>
              <p className="instruction-text">
                Please take a screenshot of your order
              </p>
              <p className="instruction-text">
                Please don't reload or switch your tab
              </p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default MyOrder;
