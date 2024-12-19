import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import Layout from "./layout/Layout";
import About from "./pages/About";
import Services from "./pages/Services";
import Blogs from "./pages/Blogs";
import Career from "./pages/Career";
import Contact from "./pages/Contact";
import SingleBlog from "./components/blogspage/components/SingleBlog";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import mautic from "./api/mautic_api_services";

const pageTitle = {
  "/": "Home",
  "/about": "About",
  "/services": "Services",
  "/blogs": "Blogs",
  "/career": "Career",
  "/contact": "Contact",
};

const MauticTracking = () => {
  const location = useLocation();

  useEffect(() => {
    const title = pageTitle[location.pathname] || "No Title";
    document.title = title;

    mautic.pageView({
      path: location.pathname,
      title: document.title,
    });
  }, [location]);

  return null;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/blogs/:blogId" element={<SingleBlog />} />
      <Route path="/career" element={<Career />} />
      <Route path="/contact" element={<Contact />} />
    </Route>
  </Routes>
);

const App = () => {
  return (
    <BrowserRouter>
      <MauticTracking />
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
