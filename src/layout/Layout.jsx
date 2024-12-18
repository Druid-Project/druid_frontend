import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { Container, Box } from "@mui/material";

const Layout = () => {
  return (
    <Container maxWidth={false} disableGutters>
      <Header />
      <Box component="main" sx={{ paddingTop: "64px" }}>
        <Outlet />
      </Box>
      <Box sx={{ mt: "auto" }}>
        <Footer />
      </Box>
    </Container>
  );
};

export default Layout;
