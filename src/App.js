// src/App.js
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Blog from './pages/Blog';
import Contact from './pages/Contact';

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/services", element: <Services /> },
  { path: "/blog", element: <Blog /> },
  { path: "/contact", element: <Contact /> },
]);

const App = () => (
  <div>
    <Header />
    <RouterProvider router={router} />
    <Footer />
  </div>
);

export default App;
