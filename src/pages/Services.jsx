import React from 'react'
import "../layout/Services.css";

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
    </div>
  )
}

export default Services
