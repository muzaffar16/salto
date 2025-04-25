import React from 'react'
import {Link} from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import PromotionImage from "../../assets/promotion/pro.png";

function Section4() {
  return (
    <>
      <section className="promotion_section">
        <Container>
            <Row className="align-item-center">
                <Col lg={6} className="text-center mb-5 mb-lg-0">
                    <img src={PromotionImage} className="img-fluid" alt="Promotion Image" />
                </Col>
                <Col lg={6} className="px-5">
                    <h2>Nothing brings people together like a good burger</h2>
                    <p>Semper lacus cursus porta primis ligula risus tempus and
                sagittis ipsum mauris lectus laoreet purus ipsum tempor enim
                ipsum porta justo integer ultrice aligula lectus aenean magna
                and pulvinar purus at pretium gravida</p>
                <ul>
                    <li><p>Fringilla risus, luctus mauris orci auctor purus euismod
                    pretium purus pretium ligula rutrum tempor sapien
                    </p></li>
                    <li><p>Fringilla risus, luctus mauris orci auctor purus euismod
                    pretium purus pretium ligula rutrum tempor sapien
                    </p></li>
                    <li><p>Fringilla risus, luctus mauris orci auctor purus euismod
                    pretium purus pretium ligula rutrum tempor sapien
                    </p></li>
                </ul>
                </Col>
            </Row>
        </Container>
      </section>

      {/* Bg parallar scroll */}
      <section className="bg_parallax_scroll"></section>
    </>
  )
}

export default Section4
