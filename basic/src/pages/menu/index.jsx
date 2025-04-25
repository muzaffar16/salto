import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import Cards from "../../components/layouts/Cards.jsx";

export const Index = ({ Data, Title, Description }) => {
  // If Data is empty, don't render the section at all
  if (Data.length === 0) {
    return null; // Return nothing if no data
  }

  return (
    <section className="menu_section">
      <Container>
        <Row>
          <Col lg={{ span: 8, offset: 2 }} className="text-center mb-5">
            <p className="para">{Description}</p>
            <h2>{Title}</h2>
          </Col>
        </Row>
        <Row>
          {Data.map((cardData) => {
            return (
              cardData && (
                <Cards
                  key={cardData.productid}
                  image={cardData.producturl}
                  title={cardData.productname}
                  price={cardData.price}
                />
              )
            );
          })}
        </Row>
      </Container>
    </section>
  );
};
