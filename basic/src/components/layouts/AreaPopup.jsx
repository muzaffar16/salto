import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Use navigate to pass data
import { useAreaContext } from "../../Context/AreaContext"; 
import "../../styles/AreaPopup.css";
import crossIcon from "../../assets/crossicon.png";

function AreaPopup({ setShowArea, setOrderType }) {
  const {
    deliveryMode,
    setDeliveryMode,
    selectedArea,
    setSelectedArea,
    selectedOutlet,
    setSelectedOutlet,
  } = useAreaContext();

  const outlets = ["Outlet 1 - Main Street", "Outlet 2 - Downtown"];
  const navigate = useNavigate();  // For navigation

  const handleSubmit = (e) => {
    e.preventDefault();

    if (deliveryMode === "Delivery" && !selectedArea) {
      alert("Please select an area for delivery.");
    } else if (deliveryMode === "Pickup" && !selectedOutlet) {
      alert("Please select an outlet for pickup.");
    } else {
      setOrderType(deliveryMode); // Store order type (delivery/pickup)
      console.log(`Order type selected: ${deliveryMode}`);

      setShowArea(false); // Close the popup

    }
  };

  return (
    <div className="area-popup">
      <form className="area-popup-container" onSubmit={handleSubmit}>
        <div className="area-popup-header">
          <h2>Please Select Your Area</h2>
          <img onClick={() => setShowArea(false)} src={crossIcon} className="cross-icon" alt="Close" />
        </div>

        {/* Delivery/Pickup Toggle */}
        <div className="area-popup-modes">
          <button type="button" className={deliveryMode === "Delivery" ? "active" : ""} onClick={() => setDeliveryMode("Delivery")}>
            Delivery
          </button>
          <button type="button" className={deliveryMode === "Pickup" ? "active" : ""} onClick={() => setDeliveryMode("Pickup")}>
            Pickup
          </button>
        </div>

        {/* Conditional Dropdown */}
        {deliveryMode === "Delivery" ? (
          <select className="area-popup-select" value={selectedArea} onChange={(e) => setSelectedArea(e.target.value)} required>
            <option value="" disabled>Select your area</option>
            <option value="FB Area - Block 0">FB Area - Block 0</option>
            <option value="North Nazimabad">North Nazimabad</option>
            <option value="Clifton">Clifton</option>
          </select>
        ) : (
          <select className="area-popup-select" value={selectedOutlet} onChange={(e) => setSelectedOutlet(e.target.value)} required>
            <option value="" disabled>Select an outlet</option>
            {outlets.map((outlet, index) => (
              <option key={index} value={outlet}>{outlet}</option>
            ))}
          </select>
        )}

        {/* Submit Button */}
        <button type="submit" className="area-popup-submit" disabled={deliveryMode === "Delivery" ? !selectedArea : !selectedOutlet}>
          Select
        </button>
      </form>
    </div>
  );
}

export default AreaPopup;
