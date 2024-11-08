import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import druidLogo from "../assets/img/druid_logo.png";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";

function Feature() {
  return (
    <Container fluid className="p-2">
      <Navbar expand={false} className="bg-body-tertiary mb-3" variant="light">
        <Navbar.Brand href="#">
          <Link to="/">
            <img
              src={druidLogo}
              width="100"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${"sm"}`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${"sm"}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${"sm"}`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${"sm"}`}>
              <Navbar.Brand href="#">
                <Link to="/">
                  <img
                    src={druidLogo}
                    width="100"
                    height="30"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                  />
                </Link>
              </Navbar.Brand>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <LinkContainer to="/">
                <Nav.Link className="fw-bold">Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/about">
                <Nav.Link className="fw-bold">About Us</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/services">
                <Nav.Link className="fw-bold">Services</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/blogs">
                <Nav.Link className="fw-bold">Blogs </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/career">
                <Nav.Link className="fw-bold">Career</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/contact">
                <Nav.Link className="fw-bold">Contact</Nav.Link>
              </LinkContainer>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Navbar>
    </Container>
  );
}

export default Feature;
