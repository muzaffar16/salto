import React, { useContext } from 'react';
import "@/styles/Cart.css";
import orderContext from '../../Context/OrderContext';
import { Link } from 'react-router-dom';
import RecommendFood from './RecommendFood';

function Cart_section() {
  const { order, incrementQuantity, decrementQuantity } = useContext(orderContext);

  // Calculate total price for all items
  const totalCartPrice = order.reduce((total, item) => total + item.price * item.quantity, 0);
  return (
    <section className='cart'>
      <div className="main_heading">
        <h3>Start Your Order</h3>
        <h1>Your Cart</h1>
      </div>
      <div className="section2">
        {order.length === 0 ? (
          <div className='empty'>
            <h1>Your cart is empty.</h1>
          </div>
        ) : (
          order.map((item) => (
            <div key={item.title} className="cart-item">
              <img src={item.imageUrl} alt={item.title} className="cart-item-image" />
              {/* console.log(${item.image}); */}
              
              <div className="cart-item-details">
                <h4>{item.title}</h4>
                <p>Price: Rs:{item.price}</p>
                <div className="quantity-controls">
                  <button onClick={() => decrementQuantity(item.title)} className="quantity-button">-</button>
                  <p>Quantity: {item.quantity}</p>
                  <button onClick={() => incrementQuantity(item.title)} className="quantity-button">+</button>
                </div>
                <p>Total for this item: Rs:{item.price * item.quantity}</p> {/* Total price for each item */}
              </div>
            </div>
          ))
        )}

      </div>
      {order.length > 0 && (
        <>
          <div className="popularItemSlider">
            <RecommendFood />
          </div>
          <div className="cart-total">
            <div>
              <h3>Total Price for All Items: Rs:{totalCartPrice.toFixed(2)}</h3> {/* Overall total price */}
            </div>
            <div>
              {/* redirect to placeOrder */}
              <Link
                to="/placeOrder"
                className="btn btn_red"
              >
                Review Payment and Address
              </Link>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default Cart_section;
