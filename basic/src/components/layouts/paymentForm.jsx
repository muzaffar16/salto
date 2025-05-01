import React, { useState, useContext } from "react"; 
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/PaymentForm.css";
import axios from 'axios';
import { toast } from 'react-toastify';
import Layout from "./layout";
import { PaymentContext } from "../../Context/PaymentContext"; 

const url = "http://localhost:3000";

const PaymentForm = ({ orderType }) => {
  const { setPaymentDone } = useContext(PaymentContext);
  const location = useLocation();
  const navigate = useNavigate();

  // Extract formData, order, totalCartPrice, and order_type from the location state
  const { formData, order, totalCartPrice, order_type } = location.state || {};

  const [cardHolder, setCardHolder] = useState("YOUR NAME");
  const [cardNumber, setCardNumber] = useState("•••• •••• •••• ••••");
  const [expiry, setExpiry] = useState("MM/YY");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [loading, setLoading] = useState(false);

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 16);
    const parts = value.match(/.{1,4}/g) || [];
    setCardNumber(parts.join(" ") || "•••• •••• •••• ••••");
    e.target.value = parts.join(" ");
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
    setExpiry(value || "MM/YY");
    e.target.value = value;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const payment_type = paymentMethod;
    const order_type = orderType;
  
    // Prepare customer data to be sent to the backend
    const customerData = { ...formData };
  
    try {
      const response = await axios.post(`${url}/api/customer/add`, customerData);
  
      if (response.status === 200) {
        toast.success("Customer Added Successfully...");
        const userId = response.data.userid;
        console.log("user id: ", userId);
  
        // ✅ FIXED: Use `userid` instead of `userId`
        const orderData = {
          userid: userId,
          items: order,
          order_type,
          payment_type
        };
  
        const orderResponse = await axios.post(`${url}/api/orders/place`, orderData);
        if (orderResponse.status === 200) {
          setPaymentDone(true);
          toast.success("Payment successful! Redirecting...");
  
          navigate("/myOrder", {
            state: {
              formData: { ...formData },
            },
          });
        }
      }
    } catch (error) {
      toast.error("There was an error processing your request.");
    }
  };
  

  return (
    <Layout>
      <div className="mainBox"></div>
      <div className="payment-container">
        <div className="payment-card">
          <div className="payment-header">
            <h2>Payment Details</h2>
            <p>Complete your purchase securely</p>
          </div>
          
          <div className="card-preview float-animation">
            <div className="card-chip"></div>
            <div className="card-details">
              <div className="card-number">{cardNumber}</div>
              <div className="card-info">
                <div>
                  <span className="card-label">Card Holder</span>
                  <span>{cardHolder}</span>
                </div>
                <div>
                  <span className="card-label">Expires</span>
                  <span>{expiry}</span>
                </div>
              </div>
            </div>
          </div>

          <form className="payment-form" onSubmit={handleSubmit}>
            {/* Only render card details if paymentMethod is 'card' */}
            {paymentMethod === "card" && (
              <>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Card Holder Name"
                    onChange={(e) => setCardHolder(e.target.value || "YOUR NAME")}
                    required
                  />
                  <label>Card Holder Name</label>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Card Number"
                    onChange={handleCardNumberChange}
                    required
                  />
                  <label>Card Number</label>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      onChange={handleExpiryChange}
                      required
                    />
                    <label>Expiry Date</label>
                  </div>
                  <div className="form-group">
                    <input type="password" placeholder="CVV" maxLength="3" required />
                    <label>CVV</label>
                  </div>
                </div>
              </>
            )}

            {/* Payment Method Selection */}
            <div className="payment-method">
              <label>Payment Method</label>
              <div>
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  Card
                </label>
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={paymentMethod === "cash"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  Cash on Delivery
                </label>
              </div>
            </div>

            <button type="submit" className="payment-btn" disabled={loading}>
              {loading ? "Processing..." : "Pay Now"}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentForm;
