import React from "react";
import { Container, Row } from "react-bootstrap";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <Container fluid>
      <Row>
        <Header />
      </Row>
      <Row>
        <Outlet />
      </Row>
      <Row>
        <Footer />
      </Row>
    </Container>
  );
};

export default Layout;
