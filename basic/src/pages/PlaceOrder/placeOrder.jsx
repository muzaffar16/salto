import React, { useContext, useEffect, useState } from "react";
import orderContext from "../../Context/OrderContext";
import "@/styles/PlaceOrder.css";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layouts/layout";
import { useAreaContext } from "../../Context/AreaContext";
import { EmailContext } from "../../Context/EmailContext";
import axios from "axios";
import { toast } from 'react-toastify';

function PlaceOrder() {
  // const url = "http://localhost:3000";
  const { order } = useContext(orderContext);
  const { selectedArea } = useAreaContext();
  const { email } = useContext(EmailContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    mobileNumber: "",
    alternateMobileNumber: "",
    address: "",
    nearestLandmark: "",
    email: email || "",
    deliveryInstructions: "",
    selectedArea: selectedArea || "",
    firstName: "",
    lastName: "",
    userId: null  // ✅ Add this
  });
  

  const [addressError, setAddressError] = useState(false);

  const totalCartPrice = order.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

const handleChange = (e) => {
  const { name, value } = e.target;

  // Allow only digits in mobile number fields
  if ((name === "mobileNumber" || name === "alternateMobileNumber") && !/^\d*$/.test(value)) {
    return; // Ignore non-digit input
  }

  setFormData({
    ...formData,
    [name]: value
  });
};


 const handleSubmit = async (e) => {
  e.preventDefault();

  const mobileRegex = /^03\d{9}$/;

  if (!mobileRegex.test(formData.mobileNumber)) {
    toast.error("Mobile number must be 11 digits and start with '03'.");
    return;
  }

  if (
    formData.alternateMobileNumber &&
    !mobileRegex.test(formData.alternateMobileNumber)
  ) {
    toast.error("Alternate number must be 11 digits and start with '03'.");
    return;
  }

  if (!formData.address.trim()) {
    setAddressError(true);
    toast.error("Please complete your address.");
    return;
  } else {
    setAddressError(false);
  }

  navigate("/paymentForm", {
    state: {
      formData,
      order,
      totalCartPrice,
      userId: formData.userId
    }
  });
};


  // ✅ Fetch user's name using email from context and auto-fill first/last name
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_backend_url}/api/user/details`, {
          params: { email }
        });

        if (response.data && response.data.name) {
          const fullName = response.data.name.trim();
          const [firstName, ...lastNameParts] = fullName.split(" ");
          const lastName = lastNameParts.join(" ");

          setFormData((prev) => ({
            ...prev,
            firstName: firstName || "",
            lastName: lastName || ""
          }));
        }
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };

    if (email) {
      fetchUserDetails();
    }
  }, [email]);

  // ✅ Fetch user's previous delivery details
  useEffect(() => {
    const fetchDeliveryDetails = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_backend_url}/api/customer/deliveryDetails`, {
          params: { email }
        });
  
        if (response.data) {
          const {
            mobile_number,
            alternate_mobile_number,
            address,
            nearest_landmark,
            delivery_instructions,
            selected_area,
            userid ,// ✅ include userid
            firstName,
            lastName
          } = response.data;
          
          setFormData((prev) => ({
            ...prev,
            mobileNumber: mobile_number || "",
            alternateMobileNumber: alternate_mobile_number || "",
            address: address || "",
            nearestLandmark: nearest_landmark || "",
            deliveryInstructions: delivery_instructions || "",
            selectedArea: selected_area || selectedArea,
            userId: userid || null ,
            firstName: firstName || "",
            lastName: lastName || ""
          }));
          
  
          setFormData((prev) => ({
            ...prev,
            mobileNumber: mobile_number || "",
            alternateMobileNumber: alternate_mobile_number || "",
            address: address || "",
            nearestLandmark: nearest_landmark || "",
            deliveryInstructions: delivery_instructions || "",
            selectedArea: selected_area || selectedArea, // fallback to context
            firstName: firstName || "",
            lastName: lastName || ""
          }));
        }
      } catch (error) {
        console.error("Failed to fetch delivery details:", error);
      }
    };
  
    if (email) {
      fetchDeliveryDetails();
    }
  }, [email]);
  

  return (
    <Layout>
      <div className="mainBox"></div>

      <form className="place-order" onSubmit={handleSubmit}>
        <div className="place-order-left">
          <p className="title">Delivery Information</p>

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

          <input
  type="tel"
  name="mobileNumber"
  value={formData.mobileNumber}
  onChange={handleChange}
  placeholder="Mobile Number"
  required
  minLength={11}
  maxLength={11}
/>

<input
  type="tel"
  name="alternateMobileNumber"
  value={formData.alternateMobileNumber}
  onChange={handleChange}
  placeholder="Alternate Mobile Number"
  minLength={11}
  maxLength={11}
/>

          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter Your Complete Address"
            required
          />
          {addressError && (
            <p className="error-text">Please complete your address</p>
          )}

          {formData.selectedArea && (
            <div className="selected-area-container">
              <label>Selected Area:</label>
              <p>{formData.selectedArea}</p>
            </div>
          )}

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
