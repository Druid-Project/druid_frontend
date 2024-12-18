import React, { useEffect } from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchFooterData } from "../redux/footerSlice";
import ConnectCard from "../components/servicespage/components/ConnectCard";
import "../assets/css/Footer.css";

function Footer() {
  const dispatch = useDispatch();
  const footerData = useSelector((state) => state.footer.data);
  const loading = useSelector((state) => state.footer.loading);
  const error = useSelector((state) => state.footer.error);

  useEffect(() => {
    dispatch(fetchFooterData({ endpoint: "node/footer", includes: "field_footer_page_sections.field_connect_card" }));
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading footer data</div>;
  }

  if (!footerData.included) {
    return null;
  }

  const footerSection = footerData.included.find(
    (item) => item.type === "paragraph--footer_section"
  );

  const socialLinks = footerSection ? footerSection.attributes.field_social_media_link : [];
  const menuLinks = footerSection ? footerSection.attributes.field_menu_links : [];

  return (
    <footer
      className="text-dark py-5 border-top"
      style={{ backgroundColor: "#F6F6F6" }}
    >
      <Container>
        <Row className="align-items-center">
          <Col md={12} className="d-flex align-items-center mb-4 mb-md-0">
            <ConnectCard data={footerData} />
          </Col>
        </Row>
        <Row className="align-items-center">
          <Col md={6} className="text-center mb-4 mb-md-0">
            <p className="fw-bold">Quick Links</p>
            <Nav className="flex-row align-items-md-end align-items-center">
              {menuLinks.map((link, index) => (
                <Nav.Link
                  key={index}
                  href={link.uri}
                  className="text-dark text-decoration-none mb-2"
                >
                  {link.title}
                </Nav.Link>
              ))}
            </Nav>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <p className="fw-bold">Follow Us</p>
            <Nav className="flex-row align-items-md-end align-items-center">
              {socialLinks.map((link, index) => (
                <Nav.Link
                  key={index}
                  href={link.uri}
                  className="text-dark text-decoration-none mb-2 d-flex align-items-center"
                >
                  {link.title}
                </Nav.Link>
              ))}
            </Nav>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
