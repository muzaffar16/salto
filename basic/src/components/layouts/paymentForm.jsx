import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "@/styles/paymentForm.css";
import axios from "axios";
import { toast } from "react-toastify";
import Layout from "./layout";
import { PaymentContext } from "../../Context/PaymentContext";

const PaymentForm = ({ orderType }) => {
  const { setPaymentDone } = useContext(PaymentContext);
  const location = useLocation();
  const navigate = useNavigate();

  const { formData, order, totalCartPrice } = location.state || {};

  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [rawCardNumber, setRawCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [rawExpiry, setRawExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [loading, setLoading] = useState(false);

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 16);
    setRawCardNumber(value);
    const parts = value.match(/.{1,4}/g) || [];
    const formatted = parts.join(" ");
    setCardNumber(formatted);
    e.target.value = formatted;
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 4);
    setRawExpiry(value);
    if (value.length > 2) value = `${value.slice(0, 2)}/${value.slice(2)}`;
    setExpiry(value);
    e.target.value = value;
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 3);
    setCvv(value);
    e.target.value = value;
  };

  const validateInputs = () => {
    if (!/^[a-zA-Z\s]{3,}$/.test(cardHolder)) {
      toast.error("Card holder name must contain only letters.");
      return false;
    }

    if (!/^\d{16}$/.test(rawCardNumber)) {
      toast.error("Card number must be 16 digits.");
      return false;
    }

    if (!/^\d{4}$/.test(rawExpiry)) {
      toast.error("Expiry must be in MMYY format.");
      return false;
    }

    const mm = parseInt(rawExpiry.slice(0, 2), 10);
    const yy = parseInt(rawExpiry.slice(2), 10) + 2000;
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    if (mm < 1 || mm > 12 || yy < currentYear || (yy === currentYear && mm < currentMonth)) {
      toast.error("Enter a valid future expiry date.");
      return false;
    }

    if (!/^\d{3}$/.test(cvv)) {
      toast.error("CVV must be 3 digits.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (paymentMethod === "card" && !validateInputs()) return;

    setLoading(true);
    try {
      const customerRes = await axios.post(`${import.meta.env.VITE_backend_url}/api/customer/add`, formData);
      if (customerRes.status === 200) {
        toast.success("Customer added successfully.");
        const userId = customerRes.data.userid;

        const orderRes = await axios.post(`${import.meta.env.VITE_backend_url}/api/orders/place`, {
          userid: userId,
          items: order,
          order_type: orderType,
          payment_type: paymentMethod
        });

        if (orderRes.status === 200) {
          toast.success("Payment successful!");
          setPaymentDone(true);
          navigate("/myOrder", { state: { formData } });
        }
      }
    } catch (error) {
      toast.error("Error processing payment.");
    } finally {
      setLoading(false);
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
              <div className="card-number">{cardNumber || "•••• •••• •••• ••••"}</div>
              <div className="card-info">
                <div>
                  <span className="card-label">Card Holder</span>
                  <span>{cardHolder || "YOUR NAME"}</span>
                </div>
                <div>
                  <span className="card-label">Expires</span>
                  <span>{expiry || "MM/YY"}</span>
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
                    onChange={(e) => setCardHolder(e.target.value)}
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
                      onChange={handleCvvChange}
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
