import React, { useContext } from 'react';
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import orderContext from '../../Context/OrderContext';
import { toast } from 'react-toastify';

function Cards({ image,  title, price }) {
  const { order, addToOrder } = useContext(orderContext);
  // const url = "http://localhost:3000"; // Backend endpoint
  return (
    <Col sm={6} lg={4} xl={3} className="mb-4">
      <Card className="overflow-hidden">
        <div className="overflow-hidden">
        {/* console.log(`{url}/api/food/${image}`);  // This will print the value of image */}
        <Card.Img variant="top" src={`${image}`} />

          
        </div>
        <Card.Body>
          <div className="d-flex align-items-center justify-content-between">
          </div>
          <Card.Title>{title}</Card.Title>
          {/* <Card.Text>{paragraph}</Card.Text> */}
          <div className="d-flex align-items-center justify-content-between">
            <div className="menu_price">
              <h5 className="mb-0">Rs:{price}</h5>
            </div>
            <div className="add_to_card">
              <Link onClick={() => {
                const orderItem = { title, price, imageUrl: `${image}` };
                // Create an order object
                addToOrder(orderItem); // Use addToOrder to update the order array
                toast.success(`${title} added into your cart`);
                console.log(order); // Log the updated order array
              }}>
                <i className="bi bi-bag me-2"></i>
                Add To Cart
              </Link>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default Cards;
