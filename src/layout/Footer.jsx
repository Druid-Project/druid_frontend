import React from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import "./Footer.css";

function Footer() {
  return (
    <footer className="bg-white text-dark py-5 border-top">
      <Container>
        <Row className="align-items-center">
          <Col md={4} className="d-flex align-items-center mb-4 mb-md-0">
            <img
              src="/src/layout/logo.webp"
              alt="Druid Logo"
              className="footer-logo me-3"
            />
            <div>
              <p className="mb-1">Pasilankatu 2</p>
              <p className="mb-1">00240 Helsinki</p>
              <p className="mb-1">Finland</p>
              <p className="mb-1">+358 20 187 6602</p>
              <p className="mb-0">
                <a
                  href="mailto:info@druid.fi"
                  className="text-dark text-decoration-none"
                >
                  info@druid.fi
                </a>
              </p>
              <p className="mb-0">Y-tunnus: 2491789-2</p>
            </div>
          </Col>
          <Col md={4} className="text-center mb-4 mb-md-0">
            <p className="fw-bold">partners with</p>
            <img
              src="/src/layout/klarna.webp"
              alt="Klarna Logo"
              className="partner-logo"
            />
          </Col>
          <Col md={4} className="text-center text-md-end">
            <p className="fw-bold">Follow Us</p>
            <Nav className="flex-column align-items-md-end align-items-center">
              <Nav.Link
                href="#facebook"
                className="text-dark text-decoration-none mb-2 d-flex align-items-center"
              >
                <i className="bi bi-facebook me-2"></i> Facebook
              </Nav.Link>
              <Nav.Link
                href="#instagram"
                className="text-dark text-decoration-none mb-2 d-flex align-items-center"
              >
                <i className="bi bi-instagram me-2"></i> Instagram
              </Nav.Link>
              <Nav.Link
                href="#twitter"
                className="text-dark text-decoration-none mb-2 d-flex align-items-center"
              >
                <i className="bi bi-twitter me-2"></i> Twitter
              </Nav.Link>
              <Nav.Link
                href="#linkedin"
                className="text-dark text-decoration-none mb-2 d-flex align-items-center"
              >
                <i className="bi bi-linkedin me-2"></i> LinkedIn
              </Nav.Link>
            </Nav>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
export default Footer;
