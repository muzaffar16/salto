import React, { useContext, useState } from "react";
import orderContext from "../../Context/OrderContext";
import "../../styles/PlaceOrder.css";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../components/layouts/layout";
import { useAreaContext } from "../../Context/AreaContext"; // Correct import of the custom hook


function PlaceOrder() {
  // const url="http://localhost:3000";
  const { order } = useContext(orderContext);
  const { selectedArea } = useAreaContext(); // Correct usage of the custom hook

  const navigate = useNavigate(); // Hook to navigate

  // State for the checkout form fields
  const [formData, setFormData] = useState({
    title: "Mr.",
    firstName: "",
    lastName: "",
    mobileNumber: "",
    alternateMobileNumber: "",
    address: "",
    nearestLandmark: "",
    email: "",
    deliveryInstructions: "",
    selectedArea: selectedArea || "", // Make sure selectedArea is a string
  });

  // State for form validation
  const [addressError, setAddressError] = useState(false);

  // Calculate total price for all items
  const totalCartPrice = order.reduce((total, item) => total + item.price * item.quantity, 0);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission (async function)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation to check if the address is filled
    if (!formData.address.trim()) {
      setAddressError(true);
      return;
    } else {
      setAddressError(false);
    }

    // Proceed to Payment form with form data, order, and total cart price as state
    navigate('/paymentForm', { 
      state: { 
        formData, 
        order, 
        totalCartPrice 
      } 
    });
};

  return (
    <Layout>
      <div className="mainBox"></div>

      <form className="place-order" onSubmit={handleSubmit}>
        <div className="place-order-left">
          <p className="title">Delivery Information</p>

          {/* Title Dropdown */}
          <select
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          >
            <option value="Mr.">Mr.</option>
            <option value="Ms.">Ms.</option>
            <option value="Mrs.">Mrs.</option>
          </select>

          {/* Name Inputs */}
          <div className="multi-fields">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              required
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
            />
          </div>

          {/* Contact Details */}
          <input
            type="tel"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            placeholder="Mobile Number"
            required
          />
          <input
            type="tel"
            name="alternateMobileNumber"
            value={formData.alternateMobileNumber}
            onChange={handleChange}
            placeholder="Alternate Mobile Number"
          />

          {/* Delivery Address */}
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter Your Complete Address"
            required
          />
          {addressError && <p className="error-text">Please complete your address</p>}

          {/* Show the selected area after the address input */}
          {formData.selectedArea && (
            <div className="selected-area-container">
              <label>Selected Area:</label>
              <p>{formData.selectedArea}</p>
            </div>
          )}

          {/* Landmark and Email */}
          <input
            type="text"
            name="nearestLandmark"
            value={formData.nearestLandmark}
            onChange={handleChange}
            placeholder="Nearest Landmark"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
          />

          {/* Delivery Instructions */}
          <input
            type="text"
            name="deliveryInstructions"
            value={formData.deliveryInstructions}
            onChange={handleChange}
            placeholder="Delivery Instructions"
          />
        </div>

        <div className="place-order-right">
          <div className="cart-total">
            <div>
              <h3>Cart Totals</h3>
              <div className="price">
                <p>Subtotal: </p>
                <p>Rs: {totalCartPrice}</p>
              </div>
              <div className="price">
                <p>Delivery Fee: </p>
                <p>Rs: 2</p>
              </div>
              <div className="price">
                <p>Total: </p>
                <p>Rs: {totalCartPrice + 2}</p>
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn_red">
            PROCEED TO PAYMENT
          </button>
        </div>
      </form>
    </Layout>
  );
}

export default PlaceOrder;
