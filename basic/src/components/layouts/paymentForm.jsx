import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "@/styles/paymentForm.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./layout";
import { PaymentContext } from "../../Context/PaymentContext";

const PaymentForm = ({ orderType }) => {
  const { setPaymentDone } = useContext(PaymentContext);
  const location = useLocation();
  const navigate = useNavigate();

  const { formData, order, totalCartPrice, order_type } = location.state || {};

  const [cardHolder, setCardHolder] = useState("YOUR NAME");
  const [cardNumber, setCardNumber] = useState("•••• •••• •••• ••••");
  const [expiry, setExpiry] = useState("MM/YY");
  const [cvv, setCvv] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [loading, setLoading] = useState(false);

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 16);
    const parts = value.match(/.{1,4}/g) || [];
    const formatted = parts.join(" ");
    setCardNumber(formatted || "•••• •••• •••• ••••");
    e.target.value = formatted;
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

    const plainCardNumber = cardNumber.replace(/\s/g, "");
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;

    if (paymentMethod === "card") {
      if (!/^\d{16}$/.test(plainCardNumber)) {
        toast.error("Card number must be 16 digits.");
        return;
      }
      if (!expiryRegex.test(expiry)) {
        toast.error("Enter a valid expiry date in MM/YY format.");
        return;
      }
      if (!/^\d{3}$/.test(cvv)) {
        toast.error("CVV must be exactly 3 digits.");
        return;
      }
    }

    const payment_type = paymentMethod;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_backend_url}/api/customer/add`,
        { ...formData }
      );

      if (response.status === 200) {
        toast.success("Customer Added Successfully...");
        const userId = response.data.userid;

        const orderData = {
          userid: userId,
          items: order,
          order_type,
          payment_type,
        };

        const orderResponse = await axios.post(
          `${import.meta.env.VITE_backend_url}/api/orders/place`,
          orderData
        );

        if (orderResponse.status === 200) {
          setPaymentDone(true);
          toast.success("Payment successful! Redirecting...");
          navigate("/myOrder", { state: { formData: { ...formData } } });
        }
      }
    } catch (error) {
      toast.error("There was an error processing your request.");
    }
  };

  return (
    <Layout>
      <ToastContainer position="top-center" />
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
            {paymentMethod === "card" && (
              <>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Card Holder Name"
                    onChange={(e) =>
                      setCardHolder(e.target.value || "YOUR NAME")
                    }
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
                    <input
                      type="password"
                      placeholder="CVV"
                      maxLength="3"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      required
                    />
                    <label>CVV</label>
                  </div>
                </div>
              </>
            )}

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
