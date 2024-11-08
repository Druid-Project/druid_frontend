import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Layout from "./pages/Layout";
import About from "./components/About";
import Services from "./components/Services";
import Blogs from "./components/Blogs";
import Career from "./components/Career";
import Contact from "./components/Contact";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route>
            {/* This is where other routes will go to allow Layout to be visible everywhere */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/career" element={<Career />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
