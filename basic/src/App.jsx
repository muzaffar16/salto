import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toast CSS
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Menu from "./pages/menu/Menu";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/placeOrder";
import { useState } from "react";
import AreaPopup from "./components/layouts/AreaPopup";
import OrderState from "./Context/OrderState"; // Import existing context
import { AreaProvider } from "./Context/AreaContext"; // Import the new AreaProvider
import PaymentForm from "./components/layouts/paymentForm";
import MyOrder from "./pages/MyOrders/myOrder";
import { PaymentProvider } from "./Context/PaymentContext";
function App() {
  const [orderType, setOrderType] = useState(""); // This will store 'Delivery' or 'Pickup'
  const [showArea, setShowArea] = useState(true); // To control the visibility of the popup


  return (
    <OrderState>
      <AreaProvider>
      <PaymentProvider>
        <Router>
          <>
            {/* Show the AreaPopup only if showArea is true */}
            {showArea && <AreaPopup setShowArea={setShowArea} setOrderType={setOrderType} />}

            
            {/* Define Routes for the application */}
            <Routes>
              <Route path="/" element={<Home setShowArea={setShowArea} />} />
              <Route path="/about" element={<About />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/myOrder" element={<MyOrder />} />
              <Route path="/placeOrder" element={<PlaceOrder />} />
              <Route path="/paymentForm" element={<PaymentForm orderType={orderType} />} />
            </Routes>

            {/* Toast notifications */}
            <ToastContainer position="top-right" autoClose={3000} />
          </>
        </Router>
        </PaymentProvider>
      </AreaProvider>
    </OrderState>
  );
}

export default App;
