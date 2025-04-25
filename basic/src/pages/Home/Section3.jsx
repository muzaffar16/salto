import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Cards from "../../components/layouts/Cards.jsx"
import axios from 'axios';


 

function Section3() {

  const url = "http://localhost:3000"; // Backend endpoint

  const [popular_food, setPopular_food] = useState([]);

  // Fetch popular food data
  const fetch_popular_data = async () => {
      try {
          const response = await axios.get(`${url}/api/food/popularFood`);
          console.log(response.data);

          if (response.data && response.data.length > 0) {
              setPopular_food(response.data);  // Set the fetched data to the state
          }
      } catch (error) {
          console.error("Error fetching popular food data:", error);
      }
  };

  useEffect(() => {
      fetch_popular_data();  // Fetch popular food data when the component mounts
  }, []);  // The empty dependency array ensures the data is fetched only once


  return (
    <section className="menu_section">
         <Container>
            <Row>
                <Col lg={{span:8, offset:2}} className="text-center mb-5">
                    <h2>
                        OUR POPULAR FOODS
                    </h2>
                    <p className='para'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio laudantium modi, dicta fugiat voluptatum pariatur quas accusantium nemo voluptate dignissimos exercitationem? Sunt!
                    </p>
                </Col>
            </Row>
            <Row>
                {popular_food.map((cardData, index) =>(
                    <Cards
                      key={index}
                      image={cardData.producturl}
                      title={cardData.productname}
                      price={cardData.price}
                    />
                ))}
            </Row>

            <Row className="pt-5">
                <Col sm={6} lg={5}>
                    <div className="ads_box ads_img1 mb-5 mb-md-0">
                        <h4 className="mb-0">
                            GET YOUR FREE
                        </h4>
                        <h5>CHEESE FRIES</h5>
                        <Link to="/" className="btn btn_red px-4 rounded-0">
                            Learn More
                        </Link>
                    </div>
                </Col>
                <Col sm={6} lg={5}>
                    <div className="ads_box ads_img2 ">
                        <h4 className="mb-0">
                            GET YOUR FREE
                        </h4>
                        <h5>CHEESE FRIES</h5>
                        <Link to="/" className="btn btn_red px-4 rounded-0">
                            Learn More
                        </Link>
                    </div>
                </Col>
            </Row>
         </Container>
    </section>
  )
}

export default Section3
