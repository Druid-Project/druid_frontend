import React from 'react'
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
