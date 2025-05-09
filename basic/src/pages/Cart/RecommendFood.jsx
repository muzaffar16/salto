import React, { useRef, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cards from "../../components/layouts/Cards";
import orderContext from "../../Context/OrderContext";
import axios from "axios";

function RecommendFood() {
    const sliderRef = useRef(null);
    const { order } = useContext(orderContext);
    const [recommendedItems, setRecommendedItems] = useState([]);
    // const url = "http://localhost:3000";
    // Fetch recommendations based on the current order
    useEffect(() => {
        const fetchRecommendations = async () => {
            if (order.length > 0) {
                console.log(order);
                
                try {
                    const response = await axios.post(`${import.meta.env.VITE_backend_url}/api/food/recommandFood`, { items: order });
                    setRecommendedItems(response.data.recommendations.flatMap(rec => rec.recommendations));
                } catch (error) {
                    // console.error("Error fetching recommendations:", error);
                }
            }
        };

        fetchRecommendations();
    }, [order]);

    // Handle left and right navigation
    const handleScroll = (direction) => {
        const slider = sliderRef.current;
        const scrollAmount = 300; // Adjust based on card width
        if (direction === "left") {
            slider.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        } else {
            slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    return (
        <section className="popular_item">
            <div className="main">
                <div className="txt">
                    <h3>Popular with your order</h3>
                    <p>Based on your selected items</p>
                </div>
                <div className="btn">
                    <Link onClick={() => handleScroll("left")}>
                        <i className="bi bi-arrow-left-circle"></i>
                    </Link>
                    <Link onClick={() => handleScroll("right")}>
                        <i className="bi bi-arrow-right-circle"></i>
                    </Link>
                </div>
            </div>
            <div className="slider-container">
                <div className="slider" ref={sliderRef}>
                    {recommendedItems.length > 0 ? (
                        recommendedItems.map((cardData) => (
                            <Cards
                                key={cardData.productid}
                                image={cardData.producturl}
                                title={cardData.productname}
                                price={cardData.price}
                            />
                        ))
                    ) : (
                        <p>No recommendations available.</p>
                    )}
                </div>
            </div>
        </section>
    );
}

export default RecommendFood;
