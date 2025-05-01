import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toast CSS
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Menu from "./pages/menu/Menu";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/placeOrder";
import { useState } from "react";
import OrderState from "./Context/OrderState"; // Existing context
import { AreaProvider } from "./Context/AreaContext"; // Existing context
import { PaymentProvider } from "./Context/PaymentContext"; // Existing context
import { TokenProvider } from "./Context/TokenContext"; // <<== 🔥 Import TokenProvider
import { EmailProvider } from "./Context/EmailContext";
import PaymentForm from "./components/layouts/paymentForm";
import MyOrder from "./pages/MyOrders/myOrder";
import LoginPopup from "./components/layouts/LoginPopup";

function App() {
  const [orderType, setOrderType] = useState(""); // This will store 'Delivery' or 'Pickup'
  const [showLogin, setShowLogin] = useState(false); // To control the visibility of the popup

  return (
    <OrderState>
      <AreaProvider>
        <PaymentProvider>
          <TokenProvider>
          <EmailProvider>
            <Router>
              <>
                {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
                
                <Routes>
                  <Route path="/" element={<Home setShowLogin={setShowLogin} />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/menu" element={<Menu />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/myOrder" element={<MyOrder />} />
                  <Route path="/placeOrder" element={<PlaceOrder />} />
                  <Route path="/paymentForm" element={<PaymentForm orderType={orderType} />} />
                </Routes>

                <ToastContainer position="top-right" autoClose={3000} />
              </>
            </Router>
            </EmailProvider>
          </TokenProvider> 
        </PaymentProvider>
      </AreaProvider>
    </OrderState>
  );
}

export default App;
