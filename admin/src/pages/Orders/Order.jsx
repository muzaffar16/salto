import React, { useState, useEffect } from "react";
import "./Order.css";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "@/assets/asset";

function Order({ url }) {
  const [orders, setOrder] = useState([]);

  const fetchAllOrder = async () => {
    try {
      const response = await axios.get(`${url}/api/orders/list`);
      console.log(response.data);

      if (response.data && response.data.success) {
        setOrder(response.data.data); // Adjust based on actual response structure
      } else {
        toast.error("No orders found");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders");
    }
  };

  useEffect(() => {
    fetchAllOrder();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div className="order-item" key={index}>
              <img src={assets.parcel_icon} alt="Parcel Icon" />
              <div>
                <p className="order-item-food">
                  {order.order_items
                    ?.filter((item) => item.productname && item.quantity) // Exclude null items
                    .map((item, idx, arr) => (
                      <span key={idx}>
                        {item.productname} X {item.quantity}
                        {idx < arr.length - 1 && ", "}
                      </span>
                    ))}
                </p>
              </div>
              <div>
                <p className="order-item-name">Customer: {order.customername}</p>
                <p className="order-item-contact">
                  Mobile: {order.mobile_number}
                </p>
                <p className="order-item-email">
                Email: {order.email}
                </p>
                <p className="order-item-address">
                  Address: {order.address}, {order.selected_area}
                </p>
                <p className="order-item-landmark">
                  Landmark: {order.nearest_landmark}
                </p>
                <p className="order-item-instructions">
                  Delivery Instructions: {order.delivery_instructions || "N/A"}
                </p>
                <p>Order type: {order.order_type}</p>
                <p>payment type: {order.payment_type}</p>
                <p>Total Amount: Rs:{order.totalamount}</p>
                <p>
                  Order Date: {new Date(order.orderdate).toLocaleString()}
                </p>
                <select
  onChange={(e) => {
    const newStatus = e.target.value;
    axios
      .post(`${url}/api/orders/status`, {
        orderid: order.orderid,
        orderstatus: newStatus,
      })
      .then((response) => {
        if (response.data ) {
          toast.success("Order status updated successfully");
          fetchAllOrder(); // Refresh orders
        } else {
          toast.error("Failed to update order status");
        }
      })
      .catch((error) => {
        console.error("Error updating order status:", error);
        toast.error("Error updating order status");
      });
  }}
  value={order.orderstatus}
>
  <option value="Food Processing">Food Processing</option>
  <option value="Out for delivery">Out for delivery</option>
  <option value="Delivered">Delivered</option>
  <option value="Cancelled">Cancelled</option>
</select>

              </div>
            </div>
          ))
        ) : (
          <p>No orders available</p>
        )}
      </div>
    </div>
  );
}

export default Order;
