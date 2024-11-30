/*import React from 'react'
import "../layout/Services.css";
import heroImage from "../layout/services-hero.png";


const servicesData = [
  {
    title: "Discovery Tour",
    description:
      "Is your web service in need of improvements, but you are unsure where to start or what to do? The Druid Discovery Tour will show you the direction – in just one week.",
    icon: "🧭", 
  },
  {
    title: "Digital Design",
    description:
      "An intuitive user experience is the key to success in the digital world. Our refined design process helps you make better decisions. We experiment with new features with rapid prototypes and design in a scalable way, ensuring a unified user experience for your service.",
    icon: "🎨", 
  },
  {
    title: "Software Development",
    description:
      "We offer reliable and long-lasting solutions for developing your digital business. Our customized implementations are based on pre-established open source products and solutions.",
    icon: "💻", 
  },
  {
    title: "Support and Maintenance",
    description:
      "Active maintenance is one of the cornerstones of a long-lasting web service. We take care of the operation and security of your web service with a response time of mere hours, and improve the service according to your needs. We can also handle security audits for you.",
    icon: "🔧", 
  },
];

const Services = () => {
  return (
    
    <div className="services">
    <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1>We help you make better digital business</h1>
            <p>
              We are warm-hearted experts of agile software development and digital
              design. We build high-quality, high-performance digital services that the
              users love from the idea to the complete service. With us, you can
              develop your digital business in a controlled, agile manner.
            </p>
            <button className="read-more-btn">Read More</button>
          </div>
          <div className="hero-image">
            <img src="../layout/services-hero.png" alt="Agile Development" />
            <div className="border-overlay"></div>
          </div>
        </div>
      </section>

      <h2 className="services-header">OUR SERVICES</h2>
      <div className="services-list">
        {servicesData.map((service, index) => (
          <div className="service-card" key={index}>
            <div className="service-icon">{service.icon}</div>
            <div className="service-info">
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </div>
            <button className="service-button">
              Read More <span className="arrow">→</span>
            </button>
          </div>
        ))}
      </div>

      <section className="contact-section">
        <h2>Get in Touch</h2>
        <div className="contact-wrapper">
          <div className="contact-form">
            <form>
              <label>
                Name:
                <input type="text" placeholder="Your Name" />
              </label>
              <label>
                Email:
                <input type="email" placeholder="Your Email" />
              </label>
              <label>
                Message:
                <textarea placeholder="Your Message"></textarea>
              </label>
              <button type="submit">Send Message</button>
            </form>
          </div>
          <div className="contact-image">
            <img src="your-contact-image-path-here.png" alt="Contact Us" />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Services
*/

import React from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Paper,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Tour, DesignServices, Code, Build, ArrowForward } from "@mui/icons-material";
const services = [
  {
    title: "Discovery Tour",
    description:
      "Is your web service in need of improvements, but you are unsure where to start or what to do? The Druid Discovery Tour will show you the direction — in just one week.",
    icon: <Tour fontSize="large" sx={{ color: "#E55332" }} />,
  },
  {
    title: "Digital Design",
    description:
      "An intuitive user experience is the key to success in the digital world. Our refined design process helps you make better decisions. We experiment with new features with rapid prototypes and design in a scalable way, ensuring a unified user experience for your service.",
    icon: <DesignServices fontSize="large" sx={{ color: "#E55332" }} />,
  },
  {
    title: "Software Development",
    description:
      "We offer reliable and long-lasting solutions for developing your digital business. Our customized implementations are based on pre-established open source products and solutions.",
    icon: <Code fontSize="large" sx={{ color: "#E55332" }} />,
  },
  {
    title: "Support and Maintenance",
    description:
      "Active maintenance is one of the cornerstones of a long-lasting web service. We take care of the operation and security of your web service with a response time of mere hours and improve the service according to your needs. We can also handle security audits for you.",
    icon: <Build fontSize="large" sx={{ color: "#E55332" }} />,
  },
];

const Services = () => {
  return (
    <div>
      <Box
        sx={{
          backgroundColor: "#fff",
          padding: "3rem 2rem",
          fontFamily: "Roboto, sans-serif",
        }}
      >
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: "bold",
                marginBottom: "1rem",
                fontSize: { xs: "2rem", md: "2.5rem" },
                textAlign: { xs: "center", md: "left" },
              }}
            >
              We help you make better digital business
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "1rem", md: "1.2rem" },
                fontFamily: "Poppins, sans-serif",
                marginBottom: "2rem",
                textAlign: { xs: "center", md: "left" },
              }}
            >
              We are warm-hearted experts of agile software development and digital design. We build high-quality, high-performance digital services that the users love.
            </Typography>
            <Box sx={{ display: "flex", justifyContent: { xs: "center", md: "flex-start" } }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#d10000", 
                  color: "#fff",
                  padding: "0.5rem 1rem",
                  fontSize: "0.8rem",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  ":hover": {
                    backgroundColor: "#b30000",
                  },
                }}
              >
                Read More
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "center", md: "flex-end" },
                alignItems: "center",
                border: "5px solid #d10000",
                width: "100%",
                height: "100%",
              }}
            >
              <img
                src="/src/layout/services-hero.png"
                alt="Agile Development Illustration"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ padding: "2rem 0" }}>
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            fontFamily: "Roboto, sans-serif",
            marginBottom: "2rem",
          }}
        >
          OUR SERVICES
        </Typography>
      </Box>

      <Box sx={{ backgroundColor: "#CECECE", padding: "2rem 0" }}>
        <Grid
          container
          spacing={4}
          sx={{
            justifyContent: "center",
            padding: { xs: "1rem", md: "2rem" },
          }}
        >
          {services.map((service, index) => (
            <Grid item xs={12} md={8} key={index}>
              <Paper
                elevation={3}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "1.5rem",
                  borderRadius: "10px",
                  backgroundColor: "#fff",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                  {service.icon}
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        fontFamily: "Roboto, sans-serif",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {service.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#666",
                        fontFamily: "Poppins, sans-serif",
                        lineHeight: "1.5",
                        marginBottom: "2rem",
                      }}
                    >
                      {service.description}
                    </Typography>
                  </Box>
                </Box>

                <Button
                  variant="contained"
                  endIcon={<ArrowForward />}
                  sx={{
                    backgroundColor: "#d10000",
                    color: "#fff",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    fontSize: "0.75rem",
                    padding: "0.4rem 1rem",
                    minWidth: "100px",
                    borderRadius: "5px",
                    ":hover": {
                      backgroundColor: "#b30000",
                    },
                  }}
                >
                  Read More
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box sx={{ padding: "4rem 2rem", backgroundColor: "#fff" }}>
  <Typography
    variant="h4"
    sx={{
      textAlign: "center",
      fontWeight: "bold",
      marginBottom: "2rem",
    }}
  >
    Get In Touch
  </Typography>
  <Grid container spacing={4} alignItems="stretch">
    {/* Left Side: Text and Form */}
    <Grid
      item
      xs={12}
      md={6}
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="body1"
        sx={{
          marginBottom: "2rem",
          lineHeight: "1.6",
          color: "#333",
        }}
      >
        Strong technical skills and 100% agility are our forte. We specialize in
        building comprehensive, customized web services and online stores. We do
        our job with an uncompromising attitude but a relaxed approach,
        challenging you to do better business online. Check out our services
        below and if you want to know more, get in touch.
      </Typography>
      <form style={{ flex: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField label="Name" fullWidth required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Email Address" fullWidth required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Phone" fullWidth required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Requested Completion Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Company/Project Name" fullWidth required />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Project Description"
              fullWidth
              multiline
              rows={4}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox color="primary" />}
              label="You agree to our friendly privacy policy."
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#d10000",
                color: "#fff",
                padding: "0.8rem 1.5rem",
                ":hover": { backgroundColor: "#b30000" },
              }}
              fullWidth
            >
              Send Message
            </Button>
          </Grid>
        </Grid>
      </form>
    </Grid>
    <Grid
      item
      xs={12}
      md={6}
      sx={{
        display: "flex",
        alignItems: "stretch",
      }}
    >
      <Box
        component="img"
        src="/src/layout/Services.png"
        alt="Contact Illustration"
        sx={{
          width: "100%",
          height: "auto", 
          borderRadius: "8px",
          objectFit: "cover", 
          maxHeight: "100%", 
        }}
      />
    </Grid>
  </Grid>
</Box>
    </div>
  );
};

export default Services;
