import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { Container } from "@mui/material";

const Layout = () => {
  return (
    <Container fluid>
      <Header />
      <Outlet />
      <Footer />
    </Container>
  );
};

export default Layout;
